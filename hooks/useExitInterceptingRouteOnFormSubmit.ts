import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function useExitInterceptingRouteOnFormSubmit() {
  const router = useRouter();
  const {pending} = useFormStatus();
  const [isSent, setIsSent] = useState(false);
  const goBack = useCallback(() => {
    router.refresh();
    router.back();
  }, [router]);

  const afterSubmit = useCallback(() => {
    setIsSent(true)
  }, [setIsSent]);

  useEffect(() => {
    if (isSent) goBack();
  }, [isSent, pending])

  return { afterSubmit, goBack };
}