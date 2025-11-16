import { getAllNewsLetter } from "@/utils/newsletter/getNewsLetter";
import NewsletterPage from "./NewsletterPage";

export default function Page() {
  const newsletters = getAllNewsLetter();

  return <NewsletterPage initialData={newsletters} />;
}
