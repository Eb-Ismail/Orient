import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Shield,
  HelpCircle,
  Clock,
  Languages,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  FileText,
  AlertCircle,
  Activity,
  CheckCircle2,
  Play,
  Square,
  Loader2
} from 'lucide-react';
import { smartJourneyService } from '../../services/smartJourneyService.js';

const SUGGESTED_PROMPTS = [
  { label: 'Diplômes & Études', text: "Voici le détail de mon cursus scolaire et de mes diplômes obtenus avant d'intégrer la Gendarmerie Royale :" },
  { label: 'Sports & Arts Martiaux', text: "Concernant ma pratique sportive, mes entraînements physiques et la gestion de mon endurance sous effort :" },
  { label: 'Informatique & Tech', text: "J'ai des connaissances et compétences pratiques en informatique, réseaux et technologies :" },
  { label: 'Travail d\'équipe & Responsabilités', text: "Dans mes expériences associatives et collectives, j'ai eu à gérer des situations imprévues en équipe :" },
  { label: 'الرياضة والانضباط', text: "كنمارس الرياضة بانتظام وعندي قدرة على تحمل الضغط والعمل الجماعي في أصعب الظروف :" },
  { label: 'تجاربي الدراسية والمهنية', text: "نبذة عن تكويني الدراسي والتجارب السابقة لي خلاتني نختار سلك الدرك الملكي :" }
];

export default function AiInterviewChat({
  conversation = [],
  onSendMessage,
  loading = false,
  onGoToAnalysis,
  onResetConversation
}) {
  // Mode sélectionné : 'text' (Gemma 4:12B) ou 'voice' (Atlasia Moulsot v0.3)
  const [activeMode, setActiveMode] = useState('text');
  const [inputText, setInputText] = useState('');

  // États du workflow vocal strict :
  // 'idle' | 'recording' | 'processing' | 'generating_audio' | 'speaking' | 'error'
  const [voiceState, setVoiceState] = useState('idle');
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentlyPlayingMsgId, setCurrentlyPlayingMsgId] = useState(null);

  // Diagnostic de santé des 2 serveurs IA
  const [aiHealth, setAiHealth] = useState({
    textAi: { online: false, model: 'gemma4:12b' },
    voiceAi: { online: false, model: 'atlasia/moulsot.v0.3' }
  });
  const [serverErrorBanner, setServerErrorBanner] = useState(null);

  // Références d'exécution, de défilement et de flux audio
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechRecognitionRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const accumulatedTranscriptRef = useRef('');
  const isRecordingRef = useRef(false);

  // Détection du scroll et indicateur de nouveau message
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewUnread, setHasNewUnread] = useState(false);
  const prevConversationLengthRef = useRef(conversation?.length || 0);
  const isInitialMountRef = useRef(true);

  // Défilement automatique ou manuel vers le dernier message
  const scrollToBottom = (behavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
    setHasNewUnread(false);
    setIsAtBottom(true);
  };

  // Suivi de la position de scroll de l'utilisateur
  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceToBottom <= 70;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setHasNewUnread(false);
    }
  };

  // Gestion du défilement lors de l'arrivée de nouveaux messages
  useEffect(() => {
    const currentLength = conversation?.length || 0;
    const prevLength = prevConversationLengthRef.current;

    if (isInitialMountRef.current) {
      // Défilement direct au premier affichage
      scrollToBottom('auto');
      isInitialMountRef.current = false;
    } else if (currentLength > prevLength) {
      const lastMsg = conversation[currentLength - 1];
      const isUserMsg = lastMsg?.role === 'user';

      if (isUserMsg || isAtBottom) {
        // Envoi par l'élève ou utilisateur déjà en bas : défilement automatique
        scrollToBottom('smooth');
      } else {
        // L'utilisateur lit volontairement des messages plus anciens : ne pas couper sa lecture
        setHasNewUnread(true);
      }
    }

    prevConversationLengthRef.current = currentLength;
  }, [conversation]);

  // Maintenir le défilement si l'IA génère et qu'on est déjà en bas
  useEffect(() => {
    if (loading && isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [loading]);

  // Vérification de la santé des serveurs IA au montage
  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      try {
        const health = await smartJourneyService.getAiHealth();
        if (isMounted && health) {
          setAiHealth(health);
        }
      } catch (err) {
        console.warn('[AiInterviewChat] Healthcheck non joignable:', err);
      }
    }
    checkHealth();
    return () => { isMounted = false; };
  }, []);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const sujet = searchParams.get('sujet');
    if (sujet && !inputText) {
      setInputText(`Je souhaite approfondir mon intérêt et mes compétences dans le domaine « ${sujet} ». Mes motivations et mes connaissances actuelles sont : `);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [searchParams]);

  // Détection arabe / darija
  const isArabicText = (text) => /[\u0600-\u06FF]/.test(text || '');

  // Détection multilingue fine : darija, en, fr
  const detectTextLanguage = (text) => {
    if (!text || typeof text !== 'string') return 'fr';
    const trimmed = text.trim();
    if (/[\u0600-\u06FF]/.test(trimmed)) return 'darija';

    // Détection Arabizi
    const arabiziMarkers = [
      'bghit', 'khedma', 'khdemt', 'dyal', 'dyali', '3andi', '3afak', 'salam', 'mezyan', 
      'daba', 'ghadi', 'lhedra', 'chouf', 'chno', 'chrif', 'f-la', 'f la', 'wakha'
    ];
    const textLower = trimmed.toLowerCase();
    if (arabiziMarkers.some((m) => textLower.includes(m))) return 'darija';

    // Détection anglais vs français
    const englishWords = [
      'the', 'and', 'what', 'which', 'who', 'how', 'when', 'why', 'where', 'are', 'you',
      'can', 'about', 'career', 'specialty', 'specialties', 'gendarmerie', 'service', 'training',
      'officer', 'unit', 'units', 'background', 'skills', 'experience', 'interests', 'would',
      'like', 'hello', 'good', 'i', 'have', 'built', 'project', 'projects', 'using',
      'development', 'developer', 'python', 'javascript', 'html', 'css', 'web'
    ];
    const frenchWords = [
      'je', 'j', 'ai', 'suis', 'le', 'la', 'les', 'des', 'dans', 'pour', 'avec', 'mon',
      'ma', 'mes', 'et', 'de', 'du', 'en', 'un', 'une', 'projet', 'projets', 'sport',
      'ans', 'pratique', 'equipe', 'équipe', 'plusieurs', 'appris', 'bonjour'
    ];

    const words = textLower.split(/[^a-zA-ZÀ-ÿ0-9_]+/);
    let enMatchCount = 0;
    let frMatchCount = 0;

    for (const w of words) {
      if (englishWords.includes(w)) enMatchCount++;
      if (frenchWords.includes(w)) frMatchCount++;
    }

    if (enMatchCount > frMatchCount && enMatchCount >= 2) return 'en';
    if (frMatchCount > 0) return 'fr';

    return 'fr';
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  // Convertit un Blob audio en chaîne Base64 pour l'envoi à Whisper STT
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        const base64 = typeof dataUrl === 'string' ? dataUrl.split(',')[1] : '';
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(blob);
    });
  };

  // Convertit un Base64 audio MP3/WAV en Object URL Blob pour la lecture HTML5 Audio
  const base64ToAudioUrl = (base64, mimeType = 'audio/mpeg') => {
    try {
      const byteChars = atob(base64);
      const byteNums = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNums[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNums);
      const blob = new Blob([byteArray], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.warn('[Audio] Erreur conversion base64 en Blob URL:', e);
      return null;
    }
  };

  // Références d'audio HTML5 & Cache des fichiers audio générés
  const audioMapRef = useRef({});
  const currentAudioElementRef = useRef(null);
  const [autoplayBlockedMsgId, setAutoplayBlockedMsgId] = useState(null);

  // Déblocage proactif des restrictions Autoplay du navigateur sur geste utilisateur
  const unlockAudioAutoplay = () => {
    if (typeof window === 'undefined') return;
    try {
      if (!window.__orientGrAudioUnlocked) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          gain.gain.value = 0.001; // quasi-inaudible
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(0);
          osc.stop(ctx.currentTime + 0.05);
        }
        window.__orientGrAudioUnlocked = true;
      }
    } catch (e) {}
  };

  // Préchargement et mise à jour dynamique des voix TTS du navigateur
  const [availableVoices, setAvailableVoices] = useState([]);
  const audioMimeTypeRef = useRef('audio/webm');
  const lastKeyToggleTimeRef = useRef(0);
  const voiceStateRef = useRef(voiceState);
  voiceStateRef.current = voiceState;
  const ttsKeepAliveTimerRef = useRef(null);
  const isPlayingAudioRef = useRef(isPlayingAudio);
  isPlayingAudioRef.current = isPlayingAudio;

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const clearTtsKeepAlive = () => {
    if (ttsKeepAliveTimerRef.current) {
      clearInterval(ttsKeepAliveTimerRef.current);
      ttsKeepAliveTimerRef.current = null;
    }
  };

  // Libération des flux et pistes microphone (éteint le voyant d'enregistrement du navigateur)
  const releaseMicrophone = () => {
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {}
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    mediaRecorderRef.current = null;
  };

  // Arrêt de toute lecture audio en cours (HTML5 Audio ou Web Speech)
  const stopAudioPlayback = () => {
    clearTtsKeepAlive();
    if (currentAudioElementRef.current) {
      try {
        currentAudioElementRef.current.pause();
        currentAudioElementRef.current.currentTime = 0;
      } catch (e) {}
      currentAudioElementRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setIsPlayingAudio(false);
    setCurrentlyPlayingMsgId(null);
    if (voiceStateRef.current === 'speaking' || voiceStateRef.current === 'generating_audio') {
      setVoiceState('idle');
    }
  };

  // Lecture d'un fichier audio réel via élément HTML5 Audio (MP3 / WAV)
  const playAudioFile = (audioUrl, fallbackText, messageId) => {
    return new Promise((resolve) => {
      stopAudioPlayback();
      setVoiceState('speaking');
      setIsPlayingAudio(true);
      setCurrentlyPlayingMsgId(messageId);
      setAutoplayBlockedMsgId(null);

      const audio = new Audio(audioUrl);
      currentAudioElementRef.current = audio;

      audio.onended = () => {
        setIsPlayingAudio(false);
        setCurrentlyPlayingMsgId(null);
        setVoiceState('idle');
        currentAudioElementRef.current = null;
        resolve();
      };

      audio.onerror = (e) => {
        console.warn('[VoicePipeline - Étape 9 : Erreur lecture HTML5 Audio] Fallback sur SpeechSynthesis:', e);
        playAiVoiceResponseSpeechSynthesis(fallbackText, messageId).then(resolve);
      };

      audio.play().then(() => {
        console.log('[VoicePipeline - Étape 9 : Lecture Automatique Réussie]', { messageId, audioUrl });
        setAutoplayBlockedMsgId(null);
      }).catch((playErr) => {
        console.warn('[VoicePipeline - Étape 9 : Autoplay bloqué par le navigateur]', playErr.name, playErr.message);
        setIsPlayingAudio(false);
        setVoiceState('idle');
        currentAudioElementRef.current = null;
        setAutoplayBlockedMsgId(messageId);
        resolve();
      });
    });
  };

  // Sélection de la meilleure voix TTS pour l'Arabe, l'Anglais ou le Français
  const getBestVoice = (lang = 'fr') => {
    const voices = availableVoices.length > 0
      ? availableVoices
      : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

    if (!voices || voices.length === 0) return null;

    const isAr = lang === 'darija' || lang === 'ar' || lang === true;
    const isEn = lang === 'en' || lang === 'english';

    if (isAr) {
      return (
        voices.find(v => v.lang === 'ar-MA' || v.lang.startsWith('ar-MA')) ||
        voices.find(v => v.lang.startsWith('ar')) ||
        voices.find(v => {
          const n = (v.name || '').toLowerCase();
          return n.includes('arabic') || n.includes('maged') || n.includes('tarik') || n.includes('hoda') || n.includes('naayf') || n.includes('laila');
        }) ||
        null
      );
    } else if (isEn) {
      return (
        voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices.find(v => {
          const n = (v.name || '').toLowerCase();
          return n.includes('english') || n.includes('david') || n.includes('george') || n.includes('mark') || n.includes('zira');
        }) ||
        null
      );
    } else {
      return (
        voices.find(v => v.lang === 'fr-FR' || v.lang.startsWith('fr-FR')) ||
        voices.find(v => v.lang.startsWith('fr')) ||
        voices.find(v => {
          const n = (v.name || '').toLowerCase();
          return n.includes('french') || n.includes('thomas') || n.includes('hortense') || n.includes('paul') || n.includes('julie') || n.includes('denise') || n.includes('henri');
        }) ||
        null
      );
    }
  };

  // Synthèse vocale de repli via Web Speech API
  const playAiVoiceResponseSpeechSynthesis = (text, messageId = null) => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setVoiceState('idle');
        resolve();
        return;
      }

      stopAudioPlayback();
      setVoiceState('speaking');
      setIsPlayingAudio(true);
      setCurrentlyPlayingMsgId(messageId);

      const utterance = new SpeechSynthesisUtterance(text);
      const detectedLang = detectTextLanguage(text);

      utterance.lang = detectedLang === 'darija' ? 'ar-SA' : (detectedLang === 'en' ? 'en-US' : 'fr-FR');
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const bestVoice = getBestVoice(detectedLang);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      clearTtsKeepAlive();
      ttsKeepAliveTimerRef.current = setInterval(() => {
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        } else {
          clearTtsKeepAlive();
        }
      }, 10000);

      utterance.onend = () => {
        clearTtsKeepAlive();
        setIsPlayingAudio(false);
        setCurrentlyPlayingMsgId(null);
        setVoiceState('idle');
        resolve();
      };

      utterance.onerror = (e) => {
        clearTtsKeepAlive();
        console.warn('[Voice TTS] Interruption lecture audio:', e);
        setIsPlayingAudio(false);
        setCurrentlyPlayingMsgId(null);
        setVoiceState('idle');
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // Rejoue la réponse audio d'un message donné (utilisé par le bouton Réécouter la voix)
  const replayVoiceMessage = async (msg, index) => {
    const msgId = msg.id || index;
    const existingUrl = msg.audioUrl || audioMapRef.current[msgId];

    if (existingUrl) {
      await playAudioFile(existingUrl, msg.text, msgId);
      return;
    }

    if (msg.audioBase64) {
      const url = base64ToAudioUrl(msg.audioBase64, msg.mimeType || 'audio/mpeg');
      if (url) {
        audioMapRef.current[msgId] = url;
        msg.audioUrl = url;
        await playAudioFile(url, msg.text, msgId);
        return;
      }
    }

    // Demande au backend de générer l'audio MP3 à la volée
    try {
      const detectedLang = detectTextLanguage(msg.text);
      const ttsRes = await smartJourneyService.generateSpeechAudio({
        text: msg.text,
        language: detectedLang
      });
      if (ttsRes?.success && ttsRes?.audioBase64) {
        const url = base64ToAudioUrl(ttsRes.audioBase64, ttsRes.mimeType || 'audio/mpeg');
        if (url) {
          audioMapRef.current[msgId] = url;
          msg.audioUrl = url;
          await playAudioFile(url, msg.text, msgId);
          return;
        }
      }
    } catch (e) {}

    // Repli SpeechSynthesis
    await playAiVoiceResponseSpeechSynthesis(msg.text, msgId);
  };

  // ============================================================================
  // WORKFLOW VOCAL SANS LIMITE DE 10 SECONDES — MOULSOT V0.3 & VOICE-TO-VOICE
  // ============================================================================

  const startVoiceRecording = async () => {
    if (isRecordingRef.current) return;
    setServerErrorBanner(null);
    unlockAudioAutoplay();
    stopAudioPlayback();

    try {
      console.log('[VoicePipeline - Étape 1 : Microphone] Demande d\'accès audio...');
      // 1. Demande de flux audio microphone haute fidélité
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      // 2. MediaRecorder continu (aucune interruption, aucun timer de 10s)
      audioChunksRef.current = [];
      const supportedType = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported
        ? (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
          ? 'audio/ogg;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : '')
        : '';

      audioMimeTypeRef.current = supportedType || 'audio/webm';

      try {
        const recorder = supportedType
          ? new MediaRecorder(stream, { mimeType: supportedType })
          : new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.start(250);
        mediaRecorderRef.current = recorder;
        console.log('[VoicePipeline - Étape 2 : MediaRecorder] Enregistrement actif format', audioMimeTypeRef.current);
      } catch (recErr) {
        console.warn('[Voice] MediaRecorder indisponible, fallback direct:', recErr);
      }

      // 3. Initialisation du chronomètre d'enregistrement sans limite
      accumulatedTranscriptRef.current = '';
      setRecognizedTranscript('');
      setRecordingSeconds(0);
      isRecordingRef.current = true;
      setVoiceState('recording');

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // 4. Reconnaissance en direct (Web Speech API pour aperçu temps réel uniquement)
      const SpeechRecognition = typeof window !== 'undefined'
        ? (window.SpeechRecognition || window.webkitSpeechRecognition)
        : null;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        speechRecognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ar-MA';

        recognition.onresult = (event) => {
          let finalPart = '';
          let interimPart = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalPart += event.results[i][0].transcript + ' ';
            } else {
              interimPart += event.results[i][0].transcript;
            }
          }
          const fullText = (finalPart + interimPart).trim();
          if (fullText) {
            accumulatedTranscriptRef.current = fullText;
            setRecognizedTranscript(fullText);
          }
        };

        recognition.onerror = (event) => {
          if (event.error !== 'no-speech') {
            console.warn('[Voice STT Live] Signal:', event.error);
          }
        };

        recognition.onend = () => {
          if (isRecordingRef.current) {
            setTimeout(() => {
              if (isRecordingRef.current && speechRecognitionRef.current) {
                try {
                  speechRecognitionRef.current.start();
                } catch (e) {}
              }
            }, 100);
          }
        };

        try {
          recognition.start();
        } catch (e) {
          console.warn('[Voice STT Live] Démarrage reconnaissance preview:', e);
        }
      }
    } catch (err) {
      console.error('[Voice] Erreur accès microphone:', err);
      setVoiceState('error');
      setServerErrorBanner("Impossible d'accéder au microphone. Veuillez vérifier vos autorisations audio.");
      releaseMicrophone();
    }
  };

  const stopVoiceRecordingAndProcess = async () => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // 1. Arrêter la reconnaissance d'aperçu
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.onend = null;
        speechRecognitionRef.current.onerror = null;
        speechRecognitionRef.current.stop();
      } catch (e) {}
    }

    // 2. Finaliser l'enregistrement MediaRecorder et assembler le Blob audio complet
    const mimeType = audioMimeTypeRef.current || 'audio/webm';
    let audioBlob = null;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      audioBlob = await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = () => {
          try {
            const blob = new Blob(audioChunksRef.current, { type: mimeType });
            resolve(blob);
          } catch (e) {
            resolve(null);
          }
        };
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
          resolve(null);
        }
      });
    } else if (audioChunksRef.current.length > 0) {
      try {
        audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
      } catch (e) {}
    }

    // 3. Libération immédiate du matériel micro
    releaseMicrophone();

    console.log('[VoicePipeline - Étape 3 : Fichier Audio Assemblé]', {
      sizeBytes: audioBlob ? audioBlob.size : 0,
      mimeType
    });

    // 4. Passage à l'état de traitement Whisper STT
    setVoiceState('processing');

    let spokenText = '';

    // Transcription via Whisper STT (backend)
    if (audioBlob && audioBlob.size > 0) {
      try {
        const audioBase64 = await blobToBase64(audioBlob);
        console.log('[VoicePipeline - Étape 4 : Envoi Audio Whisper Backend]...');
        const sttRes = await smartJourneyService.transcribeAudio({
          audioBase64,
          mimeType
        });

        if (sttRes?.success && sttRes?.text && sttRes.text.trim()) {
          spokenText = sttRes.text.trim();
          console.log('[VoicePipeline - Étape 5 : Transcription Whisper Reçue]', spokenText);
        }
      } catch (sttErr) {
        console.warn('[Voice STT] Échec transcription Whisper backend:', sttErr);
      }
    }

    // Si Whisper distant n'a pas répondu ou est indisponible, utiliser l'accumulation vocale en continu
    if (!spokenText) {
      spokenText = (accumulatedTranscriptRef.current || recognizedTranscript || '').trim();
      if (spokenText) {
        console.log('[VoicePipeline - Étape 5 : Transcription Relais Locale]', spokenText);
      }
    }

    if (!spokenText) {
      setVoiceState('idle');
      setServerErrorBanner("Aucun son ni parole détectés. Veuillez vous exprimer dans le micro puis appuyer sur Ctrl + Espace pour terminer.");
      return;
    }

    // 5. Inférence Atlasia Moulsot v0.3 et TTS automatique (Voice-to-Voice)
    await executeVoiceToVoiceConversation(spokenText);
  };

  // Traitement complet de la conversation Voice-to-Voice avec routage bimodal / multilingue
  const executeVoiceToVoiceConversation = async (spokenText) => {
    setVoiceState('processing');

    try {
      const detectedLanguage = detectTextLanguage(spokenText);

      console.log('[VoicePipeline - Étape 6 : Envoi Transcription vers Backend]', {
        texteTranscrit: spokenText,
        langueDetectee: detectedLanguage
      });

      // Envoi au service vocal avec historique partagé et routage multilingue
      const res = await onSendMessage(spokenText, {
        mode: 'voice',
        language: detectedLanguage
      });

      if (res && res.success === false) {
        setVoiceState('error');
        setServerErrorBanner(res.error || "Le conseiller vocal n'a pas pu traiter la demande pour le moment.");
        return;
      }

      const replyObj = res?.reply;
      const replyText = replyObj?.text || (res?.conversation && res.conversation[res.conversation.length - 1]?.text);
      const msgId = replyObj?.id || `msg-${Date.now()}`;

      console.log('[VoicePipeline - Étape 7 : Réponse Texte de Moulsot v0.3]', {
        replyPreview: replyText ? replyText.substring(0, 80) : '(vide)',
        hasAudioAttached: !!replyObj?.audioBase64
      });

      if (replyText) {
        setVoiceState('generating_audio');

        let audioUrl = null;

        // 1. Si le backend a déjà généré et attaché l'audio MP3
        if (replyObj?.audioBase64) {
          audioUrl = base64ToAudioUrl(replyObj.audioBase64, replyObj.mimeType || 'audio/mpeg');
          if (audioUrl) {
            audioMapRef.current[msgId] = audioUrl;
            replyObj.audioUrl = audioUrl;
          }
        }

        // 2. Si pas d'audio attaché mais synthèse demandée
        if (!audioUrl) {
          try {
            console.log('[VoicePipeline - Étape 8 : Requête TTS vers /api/ai/voice/tts]...');
            const ttsRes = await smartJourneyService.generateSpeechAudio({
              text: replyText,
              language: detectedLanguage
            });
            if (ttsRes?.success && ttsRes?.audioBase64) {
              audioUrl = base64ToAudioUrl(ttsRes.audioBase64, ttsRes.mimeType || 'audio/mpeg');
              if (audioUrl) {
                audioMapRef.current[msgId] = audioUrl;
                if (replyObj) replyObj.audioUrl = audioUrl;
              }
            }
          } catch (ttsErr) {
            console.warn('[VoicePipeline - TTS Frontend Exception]', ttsErr);
          }
        }

        // 3. Lecture automatique du fichier audio (Voice-to-Voice)
        if (audioUrl) {
          console.log('[VoicePipeline - Étape 9 : Lancement Lecture Automatique Audio]');
          await playAudioFile(audioUrl, replyText, msgId);
        } else {
          console.log('[VoicePipeline - Étape 9 : Fallback SpeechSynthesis]');
          await playAiVoiceResponseSpeechSynthesis(replyText, msgId);
        }
      } else {
        setVoiceState('idle');
      }
    } catch (err) {
      console.error('[Voice-to-Voice] Erreur d\'inférence:', err);
      setVoiceState('error');
      setServerErrorBanner(`Erreur conversation vocale : ${err.message}`);
    }
  };

  // Toggle interrupteur microphone (appelé par le bouton ou Ctrl + Espace)
  const handleToggleVoiceRecording = () => {
    unlockAudioAutoplay();
    const currentState = voiceStateRef.current;
    
    // Si l'IA est en train de parler, couper la voix en priorité pour donner la parole à l'élève
    if (currentState === 'speaking' || isPlayingAudioRef.current) {
      stopAudioPlayback();
      startVoiceRecording();
      return;
    }

    if (currentState === 'processing' || currentState === 'generating_audio') {
      return;
    }

    if (isRecordingRef.current || currentState === 'recording') {
      stopVoiceRecordingAndProcess();
    } else {
      startVoiceRecording();
    }
  };

  // ============================================================================
  // GESTIONNAIRE DU RACCOURCI CLAVIER : CTRL + ESPACE (INTERRUPTEUR FLUIDE)
  // ============================================================================
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Détection de Ctrl + Espace (ou Cmd + Espace sur Mac)
      const isSpace = e.code === 'Space' || e.key === ' ' || e.keyCode === 32;
      const hasModifier = e.ctrlKey || e.metaKey;

      if (hasModifier && isSpace) {
        // 1. Empêcher l'insertion d'espace et le défilement de page
        e.preventDefault();
        e.stopPropagation();

        // 2. Débloquer l'audio sur geste utilisateur
        unlockAudioAutoplay();

        // 3. Éviter les déclenchements répétitifs en restant appuyé
        if (e.repeat) return;

        // 4. Anti-rebond (debounce 400ms)
        const now = Date.now();
        if (now - lastKeyToggleTimeRef.current < 400) return;
        lastKeyToggleTimeRef.current = now;

        // 5. Basculer vers le mode vocal si on était en mode écrit
        setActiveMode('voice');

        // 6. Actionner l'interrupteur démarrer/arrêter
        handleToggleVoiceRecording();
      }
    };

    // Capture globale au niveau de window
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, true);
      releaseMicrophone();
      stopAudioPlayback();
    };
  }, []);

  // Envoi écrit standard (Gemma 4:12B / Voxtral selon la langue)
  const handleSubmitText = (e) => {
    e?.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || loading) return;

    setServerErrorBanner(null);
    const detectedLang = detectTextLanguage(trimmed);
    onSendMessage(trimmed, { mode: 'text', language: detectedLang });
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitText();
    }
  };

  const handleUsePrompt = (promptText) => {
    setInputText(promptText);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-card-3d w-full h-full flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Conteneur intérieur du Chat */}
      <div className="chat-card-3d-inner w-full h-full flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* HEADER MILITAIRE PROFESSIONNEL & STATUT DU CONSEILLER */}
        <div className="bg-gradient-to-r from-[#102C20] via-[#153B2B] to-[#1C4E39] text-white px-4 sm:px-6 py-3.5 border-b border-[#1C4E39] shrink-0 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Identité Conseiller */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-gold/40 shadow-xs">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#153B2B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">Conseiller d'Orientation</h3>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-gold/20 text-gold-light border border-gold/30 rounded-full">
                    Accompagnement Officiel
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Gendarmerie Royale • Échanges personnalisés par écrit ou par voix
                </p>
              </div>
            </div>

            {/* Statut du Conseiller */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Conseiller disponible</span>
              </div>

              {onGoToAnalysis && (
                <button
                  type="button"
                  onClick={onGoToAnalysis}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold-light border border-gold/40 text-xs font-bold transition-all shadow-2xs hover:shadow-gold/20 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Mon Profil & Compétences</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>
              )}

              {onResetConversation && (
                <button
                  type="button"
                  onClick={onResetConversation}
                  title="Réinitialiser l'entretien"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      {/* BARRE DE SÉLECTION DU MODE & RACCOURCI CLAVIER */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
        
        {/* Toggle Mode Texte / Mode Vocal */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => {
              setActiveMode('text');
              if (isRecordingRef.current) stopVoiceRecordingAndProcess();
              stopAudioPlayback();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              activeMode === 'text'
                ? 'bg-[#153B2B] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Mode Écrit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('voice')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              activeMode === 'voice'
                ? 'bg-[#C9A052] text-[#153B2B] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Mode Vocal</span>
          </button>
        </div>

        {/* Contrôles globaux audio et langues */}
        <div className="flex items-center gap-3">
          {isPlayingAudio && (
            <button
              type="button"
              onClick={stopAudioPlayback}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold animate-pulse cursor-pointer"
            >
              <VolumeX className="w-3 h-3" />
              <span>Arrêter la voix</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Languages className="w-3.5 h-3.5 text-[#153B2B]" />
            <span>Français • العربية • الدارجة المغربية</span>
            <span className="hidden sm:inline font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-semibold ml-1">
              Ctrl + Espace
            </span>
          </div>
        </div>
      </div>

      {/* BANNIÈRE D'ALERTE EN CAS D'INDISPONIBILITÉ D'UN SERVICE */}
      {serverErrorBanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{serverErrorBanner}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setServerErrorBanner(null); startVoiceRecording(); }}
              className="text-xs font-bold text-[#153B2B] underline cursor-pointer"
            >
              Réessayer
            </button>
            <button
              type="button"
              onClick={() => setServerErrorBanner(null)}
              className="text-amber-700 hover:text-amber-900 font-bold px-1.5 cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ZONE DE MESSAGES AVEC DÉFILEMENT INDÉPENDANT */}
      <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 bg-radial from-slate-50/50 to-white"
        >
          {conversation.map((msg, index) => {
          const isAi = msg.role === 'assistant';
          const isAr = isArabicText(msg.text || msg.transcription);
          const isVoice = msg.mode === 'voice';
          const isCurrentlySpeaking = currentlyPlayingMsgId === (msg.id || index);

          return (
            <div
              key={msg.id || index}
              className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${
                isAi ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-2xs ${
                  isAi
                    ? 'bg-[#153B2B] text-gold border-[#1C4E39]'
                    : 'bg-[#C9A052]/20 text-[#153B2B] border-[#C9A052]/40'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4 text-[#C9A052]" /> : <User className="w-4 h-4 text-[#153B2B]" />}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col space-y-1">
                {/* Badge d'attribution de modèle / mode */}
                <div
                  className={`flex items-center gap-1.5 text-xs px-1 ${
                    isAi ? 'justify-start text-slate-500' : 'justify-end text-slate-500'
                  }`}
                >
                  {isAi ? (
                    <span className="font-bold text-[#153B2B] flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#C9A052]" />
                      <span>Conseiller d'Orientation{isVoice ? ' • Vocal' : ''}</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-600 flex items-center gap-1">
                      {isVoice ? <Mic className="w-3 h-3 text-[#C9A052]" /> : null}
                      <span>Élève Gendarme</span>
                      {isVoice && <span className="text-xs bg-[#C9A052]/20 px-1.5 py-0.5 rounded text-[#8F6B20] font-bold">Vocal</span>}
                    </span>
                  )}
                  <span>•</span>
                  <span>{formatTime(msg.timestamp)}</span>
                </div>

                {/* Bulle de Contenu */}
                <div
                  dir={isAr ? 'rtl' : 'ltr'}
                  className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isAi
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                      : 'bg-[#153B2B] text-white rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text || msg.transcription}</p>

                  {/* Bouton d'écoute / réécoute pour les réponses de l'IA */}
                  {isAi && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (isCurrentlySpeaking) {
                              stopAudioPlayback();
                            } else {
                              replayVoiceMessage(msg, index);
                            }
                          }}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                            isCurrentlySpeaking
                              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isCurrentlySpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                              <span>Arrêter la voix</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#153B2B]" />
                              <span>{isVoice ? 'Réécouter la voix' : 'Écouter'}</span>
                            </>
                          )}
                        </button>

                        {/* Badge affiché STRICTEMENT si un fichier audio réel est disponible */}
                        {isVoice && (msg.audioUrl || audioMapRef.current[msg.id || index] || msg.audioBase64 || msg.hasAudio) && (
                          <span className="text-xs text-[#8F6B20] font-bold">
                            Réponse vocale optimisée
                          </span>
                        )}
                      </div>

                      {/* Autorisation d'autoplay si le navigateur a bloqué la première lecture automatique */}
                      {autoplayBlockedMsgId === (msg.id || index) && (
                        <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between gap-2 text-xs text-emerald-900 animate-pulse">
                          <span>Lecture automatique en attente d'autorisation.</span>
                          <button
                            type="button"
                            onClick={() => replayVoiceMessage(msg, index)}
                            className="px-2.5 py-1 bg-[#153B2B] hover:bg-[#1C4E39] text-gold text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            ▶ Écouter la voix
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* INDICATEUR D'ÉTAT : ENREGISTREMENT VOCAL EN COURS (PAS DE LIMITE DE 10 SECONDES) */}
        {voiceState === 'recording' && (
          <div className="p-4 rounded-2xl bg-rose-50/90 border-2 border-rose-300 shadow-sm max-w-[85%] mx-auto text-center space-y-2.5 animate-pulse">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-rose-600 text-white shadow-xs">
              <Mic className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-rose-950">
                Enregistrement vocal en cours ({recordingSeconds >= 60 ? `${Math.floor(recordingSeconds / 60)}m ${String(recordingSeconds % 60).padStart(2, '0')}s` : `${recordingSeconds}s`}) — Sans limite de temps
              </p>
              <p className="text-xs text-rose-800 mt-0.5">
                Parlez librement en <strong>Darija</strong>, <strong>Arabe</strong> ou <strong>Français</strong>.
              </p>
            </div>

            {recognizedTranscript && (
              <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-xs text-slate-800 font-sans shadow-2xs" dir="auto">
                « {recognizedTranscript} »
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={stopVoiceRecordingAndProcess}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Square className="w-3.5 h-3.5" />
                <span>Terminer et envoyer</span>
              </button>
            </div>
            <p className="text-[10px] text-rose-700">
              Raccourci : appuyez sur <strong>Ctrl + Espace</strong> pour arrêter et envoyer.
            </p>
          </div>
        )}

        {/* INDICATEUR D'ÉTAT : PROCESSING */}
        {voiceState === 'processing' && (
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-[80%] mr-auto flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#C9A052] animate-spin" />
            <span className="text-xs text-slate-700 font-medium">
              Traitement de votre message en cours...
            </span>
          </div>
        )}

        {/* INDICATEUR D'ÉTAT : GÉNÉRATION AUDIO / PAROLE */}
        {voiceState === 'generating_audio' && (
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-[80%] mr-auto flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-[#153B2B] animate-pulse" />
            <span className="text-xs text-slate-700 font-medium">
              Génération de la réponse vocale en cours...
            </span>
          </div>
        )}

        {/* INDICATEUR D'ÉTAT : IA EN COURS DE RÉFLEXION */}
        {(loading || voiceState === 'thinking') && voiceState !== 'processing' && voiceState !== 'generating_audio' && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-start">
            <div className="w-8 h-8 rounded-lg bg-[#153B2B] text-gold border border-[#1C4E39] flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-4 h-4 animate-pulse text-[#C9A052]" />
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-2">
              <span className="text-xs text-slate-600 italic">
                {activeMode === 'voice'
                  ? "Votre conseiller formule sa réponse vocale..."
                  : 'Votre conseiller analyse votre message...'}
              </span>
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#153B2B] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A052] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#153B2B] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* BOUTON DISCRET « NOUVEAU MESSAGE ↓ » LORSQUE DE NOUVEAUX MESSAGES ARRIVENT HORS DE LA ZONE VISIBLE */}
      {(!isAtBottom || hasNewUnread) && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={() => scrollToBottom('smooth')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-xl transition-all duration-200 cursor-pointer border ${
              hasNewUnread
                ? 'bg-[#153B2B] text-white border-gold hover:bg-[#1C4E39] ring-2 ring-gold/40 animate-bounce'
                : 'bg-white/95 text-[#153B2B] border-slate-300 hover:bg-slate-100 shadow-md backdrop-blur-xs'
            }`}
          >
            <span>{hasNewUnread ? 'Nouveau message' : 'Dernier message'}</span>
            <ArrowDown className={`w-3.5 h-3.5 ${hasNewUnread ? 'text-gold' : 'text-[#153B2B]'}`} />
          </button>
        </div>
      )}
      </div>

      {/* SUGGESTIONS DE RÉPONSES RAPIDES */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 py-2 shrink-0">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-slate-500">
          <HelpCircle className="w-3.5 h-3.5 text-[#C9A052]" />
          <span>Suggestions pour alimenter votre dossier partagé :</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {SUGGESTED_PROMPTS.map((p, i) => (
            <button
              key={i}
              type="button"
              disabled={loading || voiceState === 'recording' || voiceState === 'processing'}
              onClick={() => handleUsePrompt(p.text)}
              className="px-2.5 py-1 text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg whitespace-nowrap shadow-2xs hover:border-gold/50 transition-all shrink-0 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* BARRE D'ACTION (SAISIE TEXTE OU ENREGISTREMENT VOCAL) */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
        {activeMode === 'voice' ? (
          /* INTERFACE VOCALE ACTIVE (MOULSOT V0.3) */
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#C9A052]/10 border-2 border-[#C9A052]/40">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                disabled={loading || voiceState === 'processing' || voiceState === 'generating_audio'}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md cursor-pointer ${
                  voiceState === 'recording'
                    ? 'bg-rose-600 text-white animate-pulse'
                    : voiceState === 'speaking'
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-[#153B2B] hover:bg-[#1C4E39] text-[#C9A052]'
                }`}
                title="Cliquer ou appuyer sur Ctrl + Espace"
              >
                {voiceState === 'recording' ? (
                  <Square className="w-5 h-5" />
                ) : voiceState === 'processing' || voiceState === 'generating_audio' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : voiceState === 'speaking' ? (
                  <Volume2 className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </button>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#153B2B] flex items-center gap-1.5">
                  <span>
                    {voiceState === 'recording'
                      ? `Enregistrement en cours (${recordingSeconds >= 60 ? `${Math.floor(recordingSeconds / 60)}m ${String(recordingSeconds % 60).padStart(2, '0')}s` : `${recordingSeconds}s`})...`
                      : voiceState === 'processing'
                      ? 'Traitement de votre message...'
                      : voiceState === 'generating_audio'
                      ? 'Génération de la réponse...'
                      : voiceState === 'speaking'
                      ? 'Votre conseiller vous répond (Écoute active)'
                      : 'Appuyez sur le micro ou Ctrl + Espace pour parler'}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  {voiceState === 'recording'
                    ? 'Parlez sans limite. Réappuyez sur Ctrl + Espace pour envoyer.'
                    : 'Exprimez-vous en Darija marocaine, arabe ou français. Échange vocal fluide.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveMode('text');
                if (isRecordingRef.current) stopVoiceRecordingAndProcess();
                stopAudioPlayback();
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
            >
              Passer au texte
            </button>
          </div>
        ) : (
          /* INTERFACE TEXTE ACTIVE AVEC BORDURE 3D DYNAMIQUE (CAPTURE UTILISATEUR) */
          <form onSubmit={handleSubmitText} className="flex items-end gap-2.5">
            <div className="relative flex-1">
              <div className="chat-3d-input-box">
                <textarea
                  ref={inputRef}
                  dir="auto"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={2}
                  placeholder="Rédigez votre message ici... (Entrée pour envoyer, Maj+Entrée pour nouvelle ligne)"
                />
              </div>
            </div>

            {/* Bouton bascule rapide vers le micro */}
            <button
              type="button"
              onClick={() => {
                setActiveMode('voice');
                startVoiceRecording();
              }}
              title="Passer en mode vocal (Ctrl + Espace)"
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-[#C9A052]/20 text-[#153B2B] hover:text-[#153B2B] border border-slate-200 transition-all shadow-xs cursor-pointer shrink-0 active:scale-95"
            >
              <Mic className="w-5 h-5 text-[#153B2B]" />
            </button>

            {/* Bouton d'envoi écrit */}
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-[#153B2B] to-[#1C4E39] hover:from-[#1C4E39] hover:to-[#25664A] disabled:opacity-40 text-gold border border-gold/40 transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
            >
              <Send className="w-5 h-5 text-[#C9A052]" />
            </button>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}
