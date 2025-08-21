import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Send, Upload, CheckCircle } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

// Mock active form (in real app, this would come from API)
const mockActiveForm: FormField[] = [
  { id: 'name', type: 'text', label: 'Ваше имя', placeholder: 'Введите ваше имя', required: true },
  { id: 'email', type: 'email', label: 'Email', placeholder: 'example@email.com', required: true },
  { id: 'phone', type: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', required: false },
  { 
    id: 'service', 
    type: 'select', 
    label: 'Интересующая услуга', 
    required: true,
    options: ['Веб-разработка', 'Мобильные приложения', 'UI/UX дизайн', 'Консультация']
  },
  { id: 'message', type: 'textarea', label: 'Сообщение', placeholder: 'Расскажите о вашем проекте...', required: false },
  { id: 'file', type: 'file', label: 'Прикрепить файл', required: false },
  { id: 'consent', type: 'checkbox', label: 'Согласие на обработку персональных данных', required: true }
];

export const LandingForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleFileChange = (fieldId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData(prev => ({ ...prev, [fieldId]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission (in real app, this would call API)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Форма отправлена!",
        description: "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Card className="card-modern animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Спасибо за заявку!</h3>
          <p className="text-muted-foreground mb-6">
            Мы получили ваше сообщение и обязательно свяжемся с вами в ближайшее время.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="btn-ghost"
          >
            Отправить еще одну заявку
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-modern hover-lift">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Оставить заявку</h2>
          <p className="text-muted-foreground">Заполните форму и мы свяжемся с вами</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mockActiveForm.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
                <Input
                  id={field.id}
                  type={field.type === 'phone' ? 'tel' : field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="form-input"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              ) : field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="form-input min-h-[120px] resize-none"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <Select 
                  required={field.required}
                  onValueChange={(value) => handleInputChange(field.id, value)}
                >
                  <SelectTrigger className="form-select">
                    <SelectValue placeholder="Выберите опцию" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'file' ? (
                <div className="relative">
                  <Input
                    id={field.id}
                    type="file"
                    className="form-input"
                    onChange={(e) => handleFileChange(field.id, e)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    required={field.required}
                    checked={formData[field.id] || false}
                    onCheckedChange={(checked) => handleInputChange(field.id, checked)}
                  />
                  <Label 
                    htmlFor={field.id}
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    Я даю согласие на обработку персональных данных в соответствии с{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      политикой конфиденциальности
                    </a>
                  </Label>
                </div>
              ) : null}
            </div>
          ))}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-hero w-full group"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Отправить заявку
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};