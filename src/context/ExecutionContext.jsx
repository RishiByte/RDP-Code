import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const ExecutionContext = createContext(null);

const JUDGE0_BASE = 'https://judge0-ce.p.rapidapi.com';
const RAPID_HOST = 'judge0-ce.p.rapidapi.com';

export const LANGUAGE_IDS = {
  javascript: 63, // Node.js 12.14.0
  typescript: 74,
  python: 71,
  c: 50,
  cpp: 54,
  java: 62,
  plaintext: 43,
  shell: 46,
};

const LS_API_KEY = 'rdp_code_api_key';

export const ExecutionProvider = ({ children }) => {
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [apiKey, setApiKeyState] = useState(
    () => localStorage.getItem(LS_API_KEY) || ''
  );

  const saveApiKey = useCallback((key) => {
    const trimmed = key.trim();
    setApiKeyState(trimmed);
    localStorage.setItem(LS_API_KEY, trimmed);
  }, []);

  const runCode = useCallback(
    async (code, language = 'javascript') => {
      if (!apiKey.trim()) {
        setOutput({
          type: 'config-error',
          message:
            'No Judge0 API key configured. Click the ⚙ icon in the toolbar to add your RapidAPI key.',
        });
        return;
      }

      setIsRunning(true);
      setOutput({ type: 'running' });

      const langId = LANGUAGE_IDS[language] ?? 63;

      try {
        const response = await axios.post(
          `${JUDGE0_BASE}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory`,
          { source_code: code, language_id: langId, stdin: '' },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': RAPID_HOST,
            },
            timeout: 30000,
          }
        );

        const d = response.data;
        setOutput({
          type: 'result',
          stdout: d.stdout ?? '',
          stderr: d.stderr ?? '',
          compile_output: d.compile_output ?? '',
          message: d.message ?? '',
          status: d.status?.description ?? 'Unknown',
          statusId: d.status?.id ?? 0,
          time: d.time,
          memory: d.memory,
        });
      } catch (err) {
        const raw = err.response?.data;
        const msg =
          (typeof raw === 'string' ? raw : raw?.message) ||
          err.message ||
          'Execution failed.';
        setOutput({
          type: 'error',
          message: msg,
          statusCode: err.response?.status,
        });
      } finally {
        setIsRunning(false);
      }
    },
    [apiKey]
  );

  const clearOutput = useCallback(() => setOutput(null), []);

  return (
    <ExecutionContext.Provider
      value={{ output, isRunning, runCode, clearOutput, apiKey, saveApiKey }}
    >
      {children}
    </ExecutionContext.Provider>
  );
};

export const useExecution = () => {
  const ctx = useContext(ExecutionContext);
  if (!ctx) throw new Error('useExecution must be inside ExecutionProvider');
  return ctx;
};
