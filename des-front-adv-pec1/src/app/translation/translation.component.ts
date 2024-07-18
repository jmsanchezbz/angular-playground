import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-translation",
  templateUrl: "./translation.component.html",
  styleUrls: ["./translation.component.scss"],
})
export class TranslationComponent {
  public activeLang = "es";

  constructor(private translate: TranslateService) {
    this.translate.addLangs(["es", "en"]);
    this.translate.setDefaultLang(this.activeLang);

    const browserLang = translate.getBrowserLang()
      ? translate.getBrowserLang()
      : 'es';
    translate.use(browserLang?.match(/es|en/) ? browserLang : "es");
  }

  ngOnInit() {}

  public switchLang(lang: string) {
    console.log('switchLanguage: ' + lang);
    this.activeLang = lang;
    this.translate.use(lang);
  }

  public currentLang(): string {
    return this.translate.currentLang;
  }

  public langs(): string[] {
    return this.translate.getLangs();
  }
}
