import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, ExternalLink, Calendar, User, Mail, Phone, FileText, Paperclip } from 'lucide-react';
interface Submission {
  id: string;
  formName: string;
  submittedAt: string;
  data: Record<string, any>;
  fileUrl?: string;
  status: 'new' | 'viewed' | 'processed';
}

// Mock data
const mockSubmissions: Submission[] = [{
  id: '1',
  formName: 'Форма обратной связи',
  submittedAt: '2024-01-20T10:30:00Z',
  status: 'new',
  data: {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 999 123-45-67',
    service: 'Веб-разработка',
    message: 'Нужна помощь с созданием интернет-магазина',
    consent: true
  },
  fileUrl: 'https://drive.google.com/file/d/1234567890/view'
}, {
  id: '2',
  formName: 'Заявка на услуги',
  submittedAt: '2024-01-19T15:45:00Z',
  status: 'viewed',
  data: {
    name: 'Мария Сидорова',
    email: 'maria@company.com',
    phone: '+7 988 765-43-21',
    service: 'UI/UX дизайн',
    message: 'Требуется редизайн корпоративного сайта'
  }
}, {
  id: '3',
  formName: 'Форма обратной связи',
  submittedAt: '2024-01-19T09:15:00Z',
  status: 'processed',
  data: {
    name: 'Алексей Козлов',
    email: 'alex@startup.io',
    phone: '+7 977 555-66-77',
    service: 'Консультация',
    message: 'Хочу обсудить возможности автоматизации бизнес-процессов'
  }
}, {
  id: '4',
  formName: 'Заявка на услуги',
  submittedAt: '2024-01-18T14:20:00Z',
  status: 'new',
  data: {
    name: 'Елена Волкова',
    email: 'elena@example.org',
    phone: '+7 966 444-33-22',
    service: 'Мобильные приложения',
    message: 'Нужно разработать приложение для iOS и Android'
  },
  fileUrl: 'https://drive.google.com/file/d/0987654321/view'
}];
const statusColors = {
  new: 'bg-warning text-warning-foreground',
  viewed: 'bg-primary text-primary-foreground',
  processed: 'bg-success text-success-foreground'
};
const statusLabels = {
  new: 'Новая',
  viewed: 'Просмотрена',
  processed: 'Обработана'
};
export const SubmissionsManager: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = Object.values(submission.data).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    if (submission.status === 'new') {
      setSubmissions(submissions.map(s => s.id === submission.id ? {
        ...s,
        status: 'viewed'
      } : s));
    }
  };
  const handleStatusChange = (submissionId: string, newStatus: 'new' | 'viewed' | 'processed') => {
    setSubmissions(submissions.map(s => s.id === submissionId ? {
      ...s,
      status: newStatus
    } : s));
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const renderFieldValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }
    if (key === 'email') {
      return <a href={`mailto:${value}`} className="text-primary hover:underline">
          {value}
        </a>;
    }
    if (key === 'phone') {
      return <a href={`tel:${value}`} className="text-primary hover:underline">
          {value}
        </a>;
    }
    return String(value);
  };
  const getFieldIcon = (key: string) => {
    const icons = {
      name: User,
      email: Mail,
      phone: Phone,
      message: FileText,
      default: FileText
    };
    const Icon = icons[key as keyof typeof icons] || icons.default;
    return <Icon className="w-4 h-4 text-muted-foreground" />;
  };
  if (selectedSubmission) {
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Детали заявки</h3>
            <p className="text-muted-foreground">ID: {selectedSubmission.id}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
            ← Назад к списку
          </Button>
        </div>

        <Card className="card-modern">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedSubmission.formName}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Отправлена {formatDate(selectedSubmission.submittedAt)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={statusColors[selectedSubmission.status]}>
                  {statusLabels[selectedSubmission.status]}
                </Badge>
                <Select value={selectedSubmission.status} onValueChange={(value: any) => handleStatusChange(selectedSubmission.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новая</SelectItem>
                    <SelectItem value="viewed">Просмотрена</SelectItem>
                    <SelectItem value="processed">Обработана</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {Object.entries(selectedSubmission.data).map(([key, value]) => <div key={key} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  {getFieldIcon(key)}
                  <div className="flex-1">
                    <div className="font-medium capitalize mb-1">
                      {key === 'name' ? 'Имя' : key === 'email' ? 'Email' : key === 'phone' ? 'Телефон' : key === 'service' ? 'Услуга' : key === 'message' ? 'Сообщение' : key === 'consent' ? 'Согласие на обработку данных' : key}
                    </div>
                    <div className="text-foreground">
                      {renderFieldValue(key, value)}
                    </div>
                  </div>
                </div>)}
            </div>

            {selectedSubmission.fileUrl && <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium mb-1">Прикрепленный файл</div>
                    <Button variant="outline" size="sm" onClick={() => window.open(selectedSubmission.fileUrl, '_blank')}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Открыть в Google Drive
                    </Button>
                  </div>
                </div>
              </div>}
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      {/* Filters */}
      <Card className="card-modern">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Поиск по заявкам..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-input pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="viewed">Просмотренные</SelectItem>
                <SelectItem value="processed">Обработанные</SelectItem>
              </SelectContent>
            </Select>
            
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="card-modern">
          <CardContent className="py-4">
            <div className="text-2xl font-bold">{submissions.length}</div>
            <div className="text-sm text-muted-foreground">Всего заявок</div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="py-4">
            <div className="text-2xl font-bold text-warning">
              {submissions.filter(s => s.status === 'new').length}
            </div>
            <div className="text-sm text-muted-foreground">Новые</div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="py-4">
            <div className="text-2xl font-bold text-primary">
              {submissions.filter(s => s.status === 'viewed').length}
            </div>
            <div className="text-sm text-muted-foreground">Просмотрены</div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="py-4">
            <div className="text-2xl font-bold text-success">
              {submissions.filter(s => s.status === 'processed').length}
            </div>
            <div className="text-sm text-muted-foreground">Обработаны</div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map(submission => <Card key={submission.id} className="card-modern hover-lift cursor-pointer" onClick={() => handleViewSubmission(submission)}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{submission.data.name || 'Без имени'}</h4>
                    <Badge className={statusColors[submission.status]}>
                      {statusLabels[submission.status]}
                    </Badge>
                    {submission.fileUrl && <Badge variant="outline">
                        <Paperclip className="w-3 h-3 mr-1" />
                        Файл
                      </Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Форма: {submission.formName}</div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(submission.submittedAt)}</span>
                      </span>
                      {submission.data.email && <span className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{submission.data.email}</span>
                        </span>}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>)}

        {filteredSubmissions.length === 0 && <Card className="card-modern">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Заявки не найдены</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </CardContent>
          </Card>}
      </div>
    </div>;
};