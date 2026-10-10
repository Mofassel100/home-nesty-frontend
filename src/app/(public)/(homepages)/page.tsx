import { PropertyCarousel } from "@/components/modules/home-scrooler-card";
import HomeHero from "@/components/modules/home-top";
import { QuestiontAccordionDemo } from "@/components/modules/question/question-home-show";

export default function HomePage() {
  return (
    <div>
      <HomeHero></HomeHero>
      <PropertyCarousel></PropertyCarousel>
      < QuestiontAccordionDemo></QuestiontAccordionDemo>
    </div>
  );
}