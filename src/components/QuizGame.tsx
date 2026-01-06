import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Какой язык программирования считается самым популярным в 2024?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correct: 0,
    category: 'Технологии'
  },
  {
    id: 2,
    question: 'Сколько планет в Солнечной системе?',
    options: ['7', '8', '9', '10'],
    correct: 1,
    category: 'Наука'
  },
  {
    id: 3,
    question: 'В каком году вышла первая игра Mario Bros?',
    options: ['1981', '1983', '1985', '1987'],
    correct: 2,
    category: 'Игры'
  },
  {
    id: 4,
    question: 'Какая социальная сеть была запущена первой?',
    options: ['Facebook', 'Twitter', 'MySpace', 'LinkedIn'],
    correct: 2,
    category: 'История'
  },
  {
    id: 5,
    question: 'Сколько битов в одном байте?',
    options: ['4', '8', '16', '32'],
    correct: 1,
    category: 'Технологии'
  }
];

interface Player {
  name: string;
  score: number;
  emoji: string;
}

const MOCK_PLAYERS: Player[] = [
  { name: 'Вы', score: 0, emoji: '🤓' },
  { name: 'Анна', score: 250, emoji: '🎯' },
  { name: 'Саша', score: 180, emoji: '🚀' },
  { name: 'Миша', score: 320, emoji: '⚡' }
];

interface QuizGameProps {
  onClose: () => void;
}

const QuizGame = ({ onClose }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [players, setPlayers] = useState(MOCK_PLAYERS);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === question.correct) {
      const points = 100;
      setScore(score + points);
      
      setTimeout(() => {
        const newPlayers = [...players];
        newPlayers[0].score = score + points;
        setPlayers(newPlayers.sort((a, b) => b.score - a.score));
      }, 500);
    }

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  if (gameFinished) {
    return (
      <Card className="border-border/50 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" className="text-yellow-500" />
              Игра завершена!
            </div>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <Icon name="X" size={18} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
            <p className="text-4xl font-bold mb-2">{score}</p>
            <p className="text-sm text-muted-foreground">Ваш результат</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold mb-3">Таблица лидеров</p>
            {sortedPlayers.map((player, index) => (
              <div
                key={player.name}
                className={`p-3 rounded-lg flex items-center justify-between transition-all animate-fade-in ${
                  player.name === 'Вы' ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    index === 0 ? 'bg-yellow-500/20' : index === 1 ? 'bg-gray-400/20' : index === 2 ? 'bg-orange-500/20' : 'bg-muted'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : player.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">Место: {index + 1}</p>
                  </div>
                </div>
                <p className="text-lg font-bold">{player.score}</p>
              </div>
            ))}
          </div>

          <Button 
            className="w-full gradient-purple text-white"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setGameFinished(false);
              setPlayers(MOCK_PLAYERS);
            }}
          >
            <Icon name="RotateCcw" className="mr-2" />
            Играть снова
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Gamepad2" className="text-primary" />
            Викторина в чате
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {score} очков
            </Badge>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <Icon name="X" size={18} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Вопрос {currentQuestion + 1}/{QUIZ_QUESTIONS.length}</span>
            <Badge variant="secondary" className="text-xs">{question.category}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
          <p className="text-sm font-medium leading-relaxed">{question.question}</p>
        </div>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 rounded-lg text-left transition-all text-sm font-medium hover-scale ${
                  showCorrect
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : showWrong
                    ? 'bg-red-500/20 border-2 border-red-500'
                    : isSelected
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-muted hover:bg-muted/70 border-2 border-transparent'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <Icon name="CheckCircle2" className="text-green-500" size={18} />}
                  {showWrong && <Icon name="XCircle" className="text-red-500" size={18} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
          <Icon name="Users" size={14} />
          <span>{sortedPlayers.length} игроков в рейтинге</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizGame;
