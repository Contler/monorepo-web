import { InjectionToken } from "@angular/core";
import { TranslateConfig } from "./interface/config.interface";

export const TRANSLATE_CONFIG = new InjectionToken<TranslateConfig>('app.config');
