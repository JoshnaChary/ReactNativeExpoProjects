import { useIsWeb } from "@/hooks/useIsWeb";
import { QuestionnairesMobileView } from "@/view/screens/mobile/QuestionnairesMobileView";
import { QuestionnairesWebView } from "@/view/screens/web/QuestionnairesWebView";

export const QuestionnairesScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <QuestionnairesWebView /> : <QuestionnairesMobileView />;
};
