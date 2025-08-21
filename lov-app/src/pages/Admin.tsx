import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormBuilder } from '@/components/admin/FormBuilder';
import { SubmissionsManager } from '@/components/admin/SubmissionsManager';
import { LoginForm } from '@/components/admin/LoginForm';
import { Settings, FileText, Users, LogOut, PlusCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('forms');

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Управление формами и заявками</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
                Перейти на сайт
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-muted-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit lg:grid-cols-2">
            <TabsTrigger value="forms" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Формы</span>
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Заявки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Управление формами</h2>
                <p className="text-muted-foreground">Создавайте и редактируйте формы для вашего сайта</p>
              </div>
              <Button className="btn-hero">
                <PlusCircle className="w-4 h-4 mr-2" />
                Создать форму
              </Button>
            </div>
            <FormBuilder />
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Заявки</h2>
              <p className="text-muted-foreground">Просматривайте и управляйте полученными заявками</p>
            </div>
            <SubmissionsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;