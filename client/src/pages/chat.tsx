import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
// Removido axios - usando fetch nativo

// Função para testar o webhook diretamente
const testWebhook = async (message: string, sessionId: string) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no teste do webhook:', error);
    throw error;
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const N8N_WEBHOOK_URL = 'https://webhook.jeanautomationpro.com.br/webhook/bemestar';

export default function Chat() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Seja muito bem-vindo(a) ao nosso espaço de escuta. Como você está se sentindo hoje? 💙',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string>(() => {
    // Gera um sessionId simples por usuário/sessão
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('useEffect - mensagens atualizadas:', messages.length, messages);
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('=== INÍCIO DO ENVIO ===');
      console.log('Enviando mensagem para webhook:', {
        message: userMessageText,
        sessionId: sessionId,
        url: N8N_WEBHOOK_URL
      });

      // Usando fetch nativo em vez de axios
      const response = await testWebhook(userMessageText, sessionId);

      console.log('=== RESPOSTA RECEBIDA ===');
      console.log('Resposta completa:', JSON.stringify(response, null, 2));
      console.log('response.message existe?', !!response?.message);
      console.log('Valor de response.message:', response?.message);
      
      // Força a criação da mensagem do bot
      const botMessageText = response?.message || 'Resposta não encontrada';
      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        text: botMessageText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      console.log('=== CRIANDO MENSAGEM BOT ===');
      console.log('Mensagem do bot:', JSON.stringify(botMessage, null, 2));
      
      // Atualiza as mensagens
      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        console.log('=== ATUALIZANDO ESTADO ===');
        console.log('Mensagens anteriores:', prev.length);
        console.log('Novas mensagens:', newMessages.length);
        console.log('Última mensagem:', newMessages[newMessages.length - 1]);
        return newMessages;
      });
      
      setIsTyping(false);
      
      // Atualiza sessionId se vier novo
      if (response?.sessionId && response.sessionId !== sessionId) {
        setSessionId(response.sessionId);
      }
      
      console.log('=== ENVIO CONCLUÍDO ===');
    } catch (error: any) {
      console.error('=== ERRO NO ENVIO ===', error);
      
      const errorMessage = `Erro: ${error.message || 'Erro desconhecido'}`;
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickResponses = [
    'Estou me sentindo ansioso(a)',
    'Estou triste hoje',
    'Me sinto sobrecarregado(a)',
    'Preciso de ajuda',
    'Obrigado pelo apoio',
    'Estou melhor hoje'
  ];

  const handleQuickResponse = (response: string) => {
    setInputMessage(response);
  };

  const actionButtons = [
    {
      text: '🫁 Exercícios de respiração',
      action: () => navigate('/mindfulness'),
      color: 'secondary'
    },
    {
      text: '🆘 Preciso de ajuda imediata',
      action: () => navigate('/sos'),
      color: 'destructive'
    },
    {
      text: '📝 Registrar meu humor',
      action: () => navigate('/mood'),
      color: 'primary'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Espaço de Desabafo
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Um lugar seguro para expressar seus sentimentos
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-heart"></i>
            </div>
            <div>
              <h3 className="font-semibold">Assistente de Apoio</h3>
              <p className="text-sm opacity-90">Sempre aqui para ouvir</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
          {console.log('Renderizando mensagens:', messages.length, messages)}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-heart text-white text-xs"></i>
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-tr-lg'
                    : 'bg-primary/10 border border-primary/20 text-slate-900 dark:text-white rounded-tl-lg'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <i className="fas fa-user text-white text-xs"></i>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start justify-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-heart text-white text-xs"></i>
              </div>
              <div className="bg-primary/10 border border-primary/20 px-4 py-3 rounded-2xl rounded-tl-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                onClick={() => handleQuickResponse(response)}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {response}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Compartilhe seus sentimentos..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={sendMessage} disabled={isTyping || !inputMessage.trim()}>
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-center">
            💙 Suas conversas são privadas e seguras
          </p>

          {/* Action Buttons - agora abaixo do input */}
          <div className="space-y-2 mt-4">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                onClick={button.action}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Chat Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-secondary text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">100% Privado</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Suas conversas são confidenciais e seguras
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-clock text-accent text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">24/7 Disponível</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sempre aqui quando você precisar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-heart text-primary text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Sem Julgamentos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Espaço seguro para ser autêntico
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
