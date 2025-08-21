import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Eye, 
  Settings, 
  Check,
  FileText,
  Mail,
  Phone,
  List,
  CheckSquare,
  Upload,
  Type
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface Form {
  id: string;
  name: string;
  isActive: boolean;
  fields: FormField[];
  createdAt: string;
  submissions: number;
}

// Mock data
const mockForms: Form[] = [
  {
    id: '1',
    name: 'Форма обратной связи',
    isActive: true,
    createdAt: '2024-01-15',
    submissions: 42,
    fields: [
      { id: 'name', type: 'text', label: 'Имя', required: true },
      { id: 'email', type: 'email', label: 'Email', required: true },
      { id: 'message', type: 'textarea', label: 'Сообщение', required: false },
    ]
  },
  {
    id: '2',
    name: 'Заявка на услуги',
    isActive: false,
    createdAt: '2024-01-10',
    submissions: 18,
    fields: [
      { id: 'company', type: 'text', label: 'Компания', required: true },
      { id: 'phone', type: 'phone', label: 'Телефон', required: true },
      { id: 'service', type: 'select', label: 'Услуга', required: true, options: ['Веб-дизайн', 'Разработка', 'Консультация'] }
    ]
  }
];

const fieldTypeIcons = {
  text: Type,
  email: Mail,
  phone: Phone,
  select: List,
  textarea: FileText,
  checkbox: CheckSquare,
  file: Upload
};

export const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState<Form[]>(mockForms);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const { toast } = useToast();

  const handleActivateForm = (formId: string) => {
    setForms(forms.map(form => ({
      ...form,
      isActive: form.id === formId
    })));
    toast({
      title: "Форма активирована",
      description: "Теперь эта форма отображается на сайте",
    });
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
    toast({
      title: "Форма удалена",
      description: "Форма была успешно удалена",
    });
  };

  const handleEditForm = (form: Form) => {
    setEditingForm({ ...form });
  };

  const getFieldTypeLabel = (type: string) => {
    const labels = {
      text: 'Текст',
      email: 'Email',
      phone: 'Телефон', 
      select: 'Выпадающий список',
      textarea: 'Текстовая область',
      checkbox: 'Флажок',
      file: 'Файл'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (editingForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Редактирование формы</h3>
            <p className="text-muted-foreground">Настройте поля и параметры формы</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setEditingForm(null)}>
              Отмена
            </Button>
            <Button className="btn-hero">
              <Check className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </div>

        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Основные настройки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="formName">Название формы</Label>
              <Input
                id="formName"
                value={editingForm.name}
                onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingForm.isActive}
                onCheckedChange={(checked) => setEditingForm({ ...editingForm, isActive: checked })}
              />
              <Label htmlFor="active">Активная форма</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Поля формы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {editingForm.fields.map((field, index) => {
                const IconComponent = fieldTypeIcons[field.type];
                return (
                  <div key={field.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                    <IconComponent className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{field.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {getFieldTypeLabel(field.type)}
                        {field.required && <Badge variant="secondary" className="ml-2">Обязательное</Badge>}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
              
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Добавить поле
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <Card key={form.id} className="card-modern hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{form.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Создана {new Date(form.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                {form.isActive && (
                  <Badge className="bg-success text-success-foreground">
                    Активная
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Полей: {form.fields.length}</span>
                  <span>Заявок: {form.submissions}</span>
                </div>
              </div>

              <div className="space-y-2">
                {form.fields.slice(0, 3).map((field) => {
                  const IconComponent = fieldTypeIcons[field.type];
                  return (
                    <div key={field.id} className="flex items-center space-x-2 text-sm">
                      <IconComponent className="w-3 h-3 text-muted-foreground" />
                      <span>{field.label}</span>
                      {field.required && <span className="text-destructive">*</span>}
                    </div>
                  );
                })}
                {form.fields.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{form.fields.length - 3} еще...
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditForm(form)}
                  className="flex-1"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Редактировать
                </Button>
                {!form.isActive && (
                  <Button
                    size="sm"
                    onClick={() => handleActivateForm(form.id)}
                    className="btn-hero flex-1"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Активировать
                  </Button>
                )}
              </div>
              
              {!form.isActive && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteForm(form.id)}
                  className="w-full text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Удалить
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Create New Form Card */}
        <Card className="card-modern hover-lift border-dashed border-2 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Новая форма</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Создайте новую форму для сбора заявок
            </p>
            <Button className="btn-hero">
              Создать форму
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};