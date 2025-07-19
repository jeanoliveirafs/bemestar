import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Resources() {
  const { toast } = useToast();

  const handlePhoneCall = (number: string, service: string) => {
    toast({
      title: `Ligando para ${service}`,
      description: `Conectando com ${number}...`,
    });
  };

  const handleResourceClick = (resource: string) => {
    toast({
      title: "Recurso selecionado",
      description: `Abrindo informações sobre ${resource}`,
    });
  };

  const emergencyContacts = [
    {
      name: "CVV - Centro de Valorização da Vida",
      number: "188",
      description: "Prevenção do suicídio - 24h gratuito",
      icon: "fas fa-heart",
      color: "destructive"
    },
    {
      name: "SAMU",
      number: "192", 
      description: "Emergências médicas - 24h",
      icon: "fas fa-ambulance",
      color: "destructive"
    },
    {
      name: "Polícia Militar",
      number: "190",
      description: "Emergências policiais",
      icon: "fas fa-shield-alt", 
      color: "destructive"
    }
  ];

  const professionalHelp = [
    {
      title: "CAPS Centro",
      subtitle: "Centro de Atenção Psicossocial",
      description: "Atendimento psicológico gratuito pelo SUS",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-4444",
      hours: "Segunda a Sexta: 7h às 17h"
    },
    {
      title: "CAPS Vila Esperança", 
      subtitle: "Centro de Atenção Psicossocial",
      description: "Tratamento especializado em saúde mental",
      address: "Av. Principal, 456 - Vila Esperança",
      phone: "(11) 5555-6666",
      hours: "Segunda a Sexta: 8h às 18h"
    }
  ];

  const affordableTherapy = [
    {
      name: "Clínica Social São Paulo",
      description: "Atendimento psicológico com preços sociais",
      price: "A partir de R$ 20 por sessão",
      website: "clinicasocial.com.br",
      specialty: "Ansiedade, depressão, terapia familiar"
    },
    {
      name: "Instituto Sedes Sapientiae",
      description: "Formação em psicanálise com atendimento acessível", 
      price: "A partir de R$ 30 por sessão",
      website: "sedes.org.br",
      specialty: "Psicanálise, terapia individual"
    },
    {
      name: "Zenklub",
      description: "Terapia online com psicólogos certificados",
      price: "A partir de R$ 60 por sessão",
      website: "zenklub.com.br",
      specialty: "Terapia online, diversos enfoques"
    }
  ];

  const selfAssessmentTools = [
    {
      name: "PHQ-9 - Questionário de Depressão",
      description: "Avalie sintomas de depressão nos últimos 15 dias com base em critérios médicos reconhecidos",
      duration: "~5 minutos",
      icon: "fas fa-clipboard-list",
      color: "primary"
    },
    {
      name: "GAD-7 - Escala de Ansiedade",
      description: "Identifique níveis de ansiedade generalizada através de questionário validado cientificamente",
      duration: "~3 minutos", 
      icon: "fas fa-heartbeat",
      color: "secondary"
    },
    {
      name: "Escala de Estresse Percebido",
      description: "Meça seus níveis de estresse nas últimas semanas e entenda padrões",
      duration: "~4 minutos",
      icon: "fas fa-brain",
      color: "accent"
    }
  ];

  const educationalArticles = [
    {
      title: "Como escolher um psicólogo",
      description: "Guia completo para encontrar o profissional ideal para suas necessidades específicas",
      duration: "5 min de leitura",
      category: "Orientação",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Técnicas de manejo da ansiedade",
      description: "Estratégias práticas e científicas para lidar com momentos de ansiedade no cotidiano",
      duration: "8 min de leitura", 
      category: "Ansiedade",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Construindo uma rede de apoio",
      description: "A importância das relações saudáveis para o bem-estar mental e como fortalecê-las",
      duration: "6 min de leitura",
      category: "Relacionamentos", 
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Higiene do sono e saúde mental",
      description: "Como melhorar a qualidade do sono para uma melhor saúde mental e emocional",
      duration: "7 min de leitura",
      category: "Sono",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Mindfulness: ciência e prática",
      description: "Fundamentos científicos da atenção plena e exercícios práticos para o dia a dia",
      duration: "10 min de leitura",
      category: "Mindfulness",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Quando buscar terapia",
      description: "Sinais de que é hora de procurar ajuda profissional e como dar os primeiros passos",
      duration: "6 min de leitura", 
      category: "Orientação",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Recursos de Saúde Mental
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Encontre informações, testes de autoavaliação e apoio profissional para sua jornada de bem-estar mental
        </p>
      </div>

      {/* Emergency Contacts */}
      <Card className="mb-8 border-destructive/30 bg-gradient-to-br from-destructive/5 to-red-50 dark:from-destructive/10 dark:to-red-900/10">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <i className="fas fa-phone text-destructive mr-3"></i>
            🆘 Contatos de Emergência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                onClick={() => handlePhoneCall(contact.number, contact.name)}
                className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all border border-destructive/20 group"
              >
                <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                  <i className={`${contact.icon} text-white`}></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {contact.name}
                  </p>
                  <p className="text-lg font-bold text-destructive">{contact.number}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {contact.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              Ligações confidenciais e gratuitas disponíveis 24 horas por dia
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Help */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* CAPS Locator */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
              <i className="fas fa-map-marker-alt text-primary mr-3"></i>
              CAPS Mais Próximo
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Centros de Atenção Psicossocial oferecem atendimento gratuito pelo SUS
            </p>
            <div className="space-y-3 mb-4">
              {professionalHelp.map((caps, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-white">{caps.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{caps.description}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{caps.address}</p>
                  <p className="text-sm text-primary">📞 {caps.phone}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{caps.hours}</p>
                </div>
              ))}
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleResourceClick('CAPS')}
            >
              Buscar CAPS na minha região
            </Button>
          </CardContent>
        </Card>

        {/* Affordable Therapy */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
              <i className="fas fa-user-md text-secondary mr-3"></i>
              Terapia Acessível
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Psicólogos com preços sociais e opções de pagamento
            </p>
            <div className="space-y-3 mb-4">
              {affordableTherapy.map((therapy, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-white">{therapy.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{therapy.description}</p>
                  <p className="text-sm font-semibold text-secondary">{therapy.price}</p>
                  <p className="text-sm text-secondary">🌐 {therapy.website}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{therapy.specialty}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => handleResourceClick('Terapia Acessível')}
            >
              Ver mais opções
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Self-Assessment Tools */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Autoavaliação
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Questionários validados cientificamente para avaliar seu bem-estar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfAssessmentTools.map((tool, index) => (
              <div
                key={index}
                onClick={() => handleResourceClick(tool.name)}
                className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:border-primary dark:hover:border-primary transition-colors cursor-pointer group"
              >
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 bg-${tool.color}/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform`}>
                    <i className={`${tool.icon} text-${tool.color}`}></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{tool.name}</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center text-primary text-sm">
                  <i className="fas fa-clock mr-2"></i>
                  <span>{tool.duration}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Importante:</strong> Estes questionários são apenas ferramentas de autoconhecimento 
              e não substituem diagnóstico profissional. Consulte sempre um psicólogo ou psiquiatra qualificado.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Conteúdo Educativo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalArticles.map((article, index) => (
              <div
                key={index}
                onClick={() => handleResourceClick(article.title)}
                className="group cursor-pointer resource-card"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
                />
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {article.description}
                </p>
                <div className="flex items-center text-primary text-sm">
                  <i className="fas fa-clock mr-2"></i>
                  <span>{article.duration}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg"
              onClick={() => handleResourceClick('Todos os artigos')}
            >
              Ver todos os artigos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Disclaimer */}
      <Card className="mt-8 border-purple-200 dark:border-purple-800/30 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-purple-600 dark:text-purple-400 text-xl mt-1"></i>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Aviso Importante
              </h4>
              <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                <strong>Este aplicativo oferece apoio emocional e recursos educativos, mas não substitui 
                acompanhamento psicológico ou psiquiátrico profissional.</strong> Se você está passando por uma crise 
                ou tem pensamentos de autolesão, procure ajuda profissional imediatamente ou ligue para o CVV (188). 
                Em caso de emergência médica, ligue para o SAMU (192).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
