import React from 'react';
import { LandingForm } from '@/components/LandingForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Shield, Zap, Award, Smartphone, ChevronRight } from 'lucide-react';
const Index = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    formSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold tracking-tight">
                Samsung
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-32 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-background via-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                Инновации
                <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  следующего поколения
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Присоединяйтесь к технологической революции. Создайте заявку на получение 
                инновационных решений от мирового лидера в области технологий.
              </p>
              
              <Button onClick={scrollToForm} className="btn-hero group text-lg px-8 py-6 mb-16">
                Начать путешествие
                <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>

            {/* Hero Visual Element */}
            <div className="relative animate-slide-up">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center border border-primary/20">
                <Smartphone className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Начните сотрудничество
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Заполните форму ниже, и наши эксперты свяжутся с вами для обсуждения 
              вашего проекта и предложения оптимального решения
            </p>
          </div>

          <div className="animate-slide-up">
            <LandingForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-dim border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">Samsung</div>
            
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Поддержка
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Samsung. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;