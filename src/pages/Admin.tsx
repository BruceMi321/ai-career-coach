import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, RefreshCw, Mail, Settings, Users, Building2, Shield, Trash2, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface EnterpriseReservation {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  team_size: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface EmailConfig {
  id: string;
  notification_email: string;
  resend_api_key: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UserWithRoles {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  roles: AppRole[];
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [reservations, setReservations] = useState<EnterpriseReservation[]>([]);
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedRole, setSelectedRole] = useState<AppRole>('user');

  const [configForm, setConfigForm] = useState({
    notification_email: '',
    resend_api_key: '',
    is_active: true
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast({
        title: "无权访问",
        description: "您没有管理员权限",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isAdmin, adminLoading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchReservations();
      fetchEmailConfig();
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchReservations = async () => {
    setLoadingReservations(true);
    try {
      const { data, error } = await supabase
        .from('enterprise_reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "加载失败",
        description: "无法加载企业预约记录",
        variant: "destructive"
      });
    } finally {
      setLoadingReservations(false);
    }
  };

  const fetchEmailConfig = async () => {
    setLoadingConfig(true);
    try {
      const { data, error } = await supabase
        .from('email_config')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setEmailConfig(data);
        setConfigForm({
          notification_email: data.notification_email,
          resend_api_key: data.resend_api_key || '',
          is_active: data.is_active
        });
      }
    } catch (error) {
      console.error('Error fetching email config:', error);
    } finally {
      setLoadingConfig(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine profiles with their roles
      const usersWithRoles: UserWithRoles[] = (profiles || []).map(profile => ({
        id: profile.id,
        email: profile.email,
        display_name: profile.display_name,
        created_at: profile.created_at,
        roles: (roles || [])
          .filter(r => r.user_id === profile.id)
          .map(r => r.role)
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "加载失败",
        description: "无法加载用户列表",
        variant: "destructive"
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "角色已存在",
            description: "该用户已拥有此角色",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: "角色已添加",
        description: `已成功添加 ${getRoleLabel(role)} 角色`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error adding role:', error);
      toast({
        title: "添加失败",
        description: "无法添加角色",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast({
        title: "角色已移除",
        description: `已成功移除 ${getRoleLabel(role)} 角色`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: "移除失败",
        description: "无法移除角色",
        variant: "destructive"
      });
    }
  };

  const getRoleLabel = (role: AppRole) => {
    const roleMap: Record<AppRole, string> = {
      admin: '管理员',
      moderator: '版主',
      user: '用户'
    };
    return roleMap[role] || role;
  };

  const getRoleVariant = (role: AppRole): "default" | "secondary" | "destructive" | "outline" => {
    const variantMap: Record<AppRole, "default" | "secondary" | "destructive" | "outline"> = {
      admin: 'destructive',
      moderator: 'secondary',
      user: 'outline'
    };
    return variantMap[role] || 'default';
  };

  const handleSaveConfig = async () => {
    if (!configForm.notification_email) {
      toast({
        title: "请填写邮箱地址",
        description: "通知邮箱是必填项",
        variant: "destructive"
      });
      return;
    }

    setSavingConfig(true);
    try {
      if (emailConfig) {
        const { error } = await supabase
          .from('email_config')
          .update({
            notification_email: configForm.notification_email,
            resend_api_key: configForm.resend_api_key || null,
            is_active: configForm.is_active
          })
          .eq('id', emailConfig.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('email_config')
          .insert({
            notification_email: configForm.notification_email,
            resend_api_key: configForm.resend_api_key || null,
            is_active: configForm.is_active
          });

        if (error) throw error;
      }

      toast({
        title: "保存成功",
        description: "邮件通知配置已更新"
      });
      
      fetchEmailConfig();
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "保存失败",
        description: "无法保存邮件配置",
        variant: "destructive"
      });
    } finally {
      setSavingConfig(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('enterprise_reservations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "状态已更新",
        description: `预约状态已更改为 ${getStatusLabel(newStatus)}`
      });

      fetchReservations();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "更新失败",
        description: "无法更新预约状态",
        variant: "destructive"
      });
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '待处理',
      contacted: '已联系',
      completed: '已完成',
      cancelled: '已取消'
    };
    return statusMap[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: 'default',
      contacted: 'secondary',
      completed: 'outline',
      cancelled: 'destructive'
    };
    return variantMap[status] || 'default';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">管理后台</h1>
            <p className="text-muted-foreground">管理企业预约和系统配置</p>
          </div>
        </div>

        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="reservations" className="gap-2">
              <Building2 className="h-4 w-4" />
              企业预约
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Shield className="h-4 w-4" />
              用户角色
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              邮件配置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    企业预约记录
                  </CardTitle>
                  <CardDescription>
                    共 {reservations.length} 条预约记录
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchReservations} disabled={loadingReservations}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loadingReservations ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
              </CardHeader>
              <CardContent>
                {loadingReservations ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无预约记录
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>公司名称</TableHead>
                          <TableHead>联系人</TableHead>
                          <TableHead>邮箱</TableHead>
                          <TableHead>电话</TableHead>
                          <TableHead>团队规模</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>提交时间</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">{reservation.company_name}</TableCell>
                            <TableCell>{reservation.contact_name}</TableCell>
                            <TableCell>{reservation.email}</TableCell>
                            <TableCell>{reservation.phone || '-'}</TableCell>
                            <TableCell>{reservation.team_size || '-'}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusVariant(reservation.status)}>
                                {getStatusLabel(reservation.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(reservation.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {reservation.status === 'pending' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateStatus(reservation.id, 'contacted')}
                                  >
                                    标记已联系
                                  </Button>
                                )}
                                {reservation.status === 'contacted' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateStatus(reservation.id, 'completed')}
                                  >
                                    标记完成
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    用户角色管理
                  </CardTitle>
                  <CardDescription>
                    共 {users.length} 个用户
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loadingUsers}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无用户
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>用户</TableHead>
                          <TableHead>邮箱</TableHead>
                          <TableHead>当前角色</TableHead>
                          <TableHead>注册时间</TableHead>
                          <TableHead>添加角色</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.display_name || '未设置'}
                            </TableCell>
                            <TableCell>{user.email || '-'}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.roles.length === 0 ? (
                                  <span className="text-muted-foreground text-sm">无角色</span>
                                ) : (
                                  user.roles.map((role) => (
                                    <Badge 
                                      key={role} 
                                      variant={getRoleVariant(role)}
                                      className="cursor-pointer hover:opacity-80 gap-1"
                                      onClick={() => handleRemoveRole(user.id, role)}
                                    >
                                      {getRoleLabel(role)}
                                      <Trash2 className="h-3 w-3" />
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(user.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2 items-center">
                                <Select
                                  value={selectedRole}
                                  onValueChange={(value) => setSelectedRole(value as AppRole)}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">管理员</SelectItem>
                                    <SelectItem value="moderator">版主</SelectItem>
                                    <SelectItem value="user">用户</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAddRole(user.id, selectedRole)}
                                  disabled={user.roles.includes(selectedRole)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  邮件通知配置
                </CardTitle>
                <CardDescription>
                  配置新企业预约时的邮件通知。需要 Resend API 密钥才能发送邮件。
                  <br />
                  <a 
                    href="https://resend.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    获取 Resend API 密钥 →
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loadingConfig ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="notification_email">通知邮箱地址</Label>
                      <Input
                        id="notification_email"
                        type="email"
                        placeholder="admin@example.com"
                        value={configForm.notification_email}
                        onChange={(e) => setConfigForm(prev => ({ ...prev, notification_email: e.target.value }))}
                      />
                      <p className="text-sm text-muted-foreground">
                        新预约时将发送通知到此邮箱
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resend_api_key">Resend API 密钥</Label>
                      <Input
                        id="resend_api_key"
                        type="password"
                        placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={configForm.resend_api_key}
                        onChange={(e) => setConfigForm(prev => ({ ...prev, resend_api_key: e.target.value }))}
                      />
                      <p className="text-sm text-muted-foreground">
                        用于发送邮件通知，请妥善保管
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label>启用邮件通知</Label>
                        <p className="text-sm text-muted-foreground">
                          开启后，新预约将自动发送邮件通知
                        </p>
                      </div>
                      <Switch
                        checked={configForm.is_active}
                        onCheckedChange={(checked) => setConfigForm(prev => ({ ...prev, is_active: checked }))}
                      />
                    </div>

                    <Button onClick={handleSaveConfig} disabled={savingConfig} className="w-full sm:w-auto">
                      {savingConfig ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          保存中...
                        </>
                      ) : (
                        '保存配置'
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
