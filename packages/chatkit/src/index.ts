import type * as Widgets from './widgets';

export * from './widgets';

export type StartScreenPrompt = {
  label: string;
  prompt: string;
  icon?: IconName;
};

export type Attachment =
  | {
      type: 'file';
      id: string;
      name: string;
      mimeType: string;
    }
  | {
      type: 'image';
      id: string;
      preview: string;
      name: string;
      mimeType: string;
    };

export type HeaderIcon =
  | 'sidebar-left'
  | 'sidebar-right'
  | 'sidebar-open-left'
  | 'sidebar-open-right'
  | 'sidebar-open-left-alt'
  | 'sidebar-open-right-alt'
  | 'sidebar-floating-left'
  | 'sidebar-floating-right'
  | 'sidebar-floating-open-left'
  | 'sidebar-floating-open-right'
  | 'sidebar-collapse-left'
  | 'sidebar-collapse-right'
  | 'collapse-left'
  | 'collapse-right'
  | 'open-left'
  | 'open-right'
  | 'double-chevron-left'
  | 'double-chevron-right'
  | 'home'
  | 'home-alt'
  | 'back-small'
  | 'back-large'
  | 'expand-large'
  | 'collapse-large'
  | 'expand-small'
  | 'collapse-small'
  | 'star'
  | 'star-filled'
  | 'chat-temporary'
  | 'settings-cog'
  | 'grid'
  | 'dots-horizontal'
  | 'dots-vertical'
  | 'dots-horizontal-circle'
  | 'dots-vertical-circle'
  | 'menu'
  | 'menu-inverted'
  | 'hamburger'
  | 'compose'
  | 'light-mode'
  | 'dark-mode'
  | 'close';

export type IconName =
  | 'agent'
  | 'analytics'
  | 'atom'
  | 'batch'
  | 'bolt'
  | 'book-open'
  | 'book-closed'
  | 'bug'
  | 'calendar'
  | 'chart'
  | 'circle-question'
  | 'compass'
  | 'cube'
  | 'globe'
  | 'keys'
  | 'lab'
  | 'images'
  | 'lifesaver'
  | 'lightbulb'
  | 'map-pin'
  | 'name'
  | 'notebook'
  | 'notebook-pencil'
  | 'page-blank'
  | 'profile'
  | 'profile-card'
  | 'search'
  | 'sparkle'
  | 'sparkle-double'
  | 'square-code'
  | 'square-image'
  | 'square-text'
  | 'suitcase'
  | 'write'
  | 'write-alt'
  | 'write-alt2';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClientTools {}

export type ToolOption = {
  id: string;

  /** Label displayed in the tool menu */
  label: string;

  /** Label displayed in the button when the tool is selected. */
  shortLabel?: string;

  /** Placeholder text to show in the composer input when the tool is selected. */
  placeholderOverride?: string;

  /**
   * Icon displayed next to the tool in the menu.
   */
  icon: IconName;

  /**
   * Whether the tool is pinned to the composer outside of the tool menu.
   *
   * @default false
   */
  pinned?: boolean;
};

export type FileUploadStrategy =
  | { type: 'two_phase' }
  | { type: 'direct'; uploadUrl: string };

/**
 * A structured object representing a referenceable item such as a
 * person, document, or internal business object.
 */
export type Entity = {
  /**
   * Human-readable name shown in tags, sources, previews, etc.
   * e.g. "Harry Potter", "Claim #A-1023", "Q2 Planning Doc"
   */
  title: string;
  id: string;
  /**
   * Optional icon to show when rendering the entity.
   */
  icon?: string;
  /**
   * Whether the entity is interactive can be clicked or previewed.
   */
  interactive?: boolean;
  /**
   * Optional human-readable group name to group entities by.
   * e.g. "People", "Documents"
   */
  group?: string;
  /**
   * Optional metadata that will be proxied to the server if this entity is part of
   * a submitted user message (e.g. in tags) or for client entity callbacks (e.g. for
   * click or preview). This is not directly used in ChatKit.js and can contain
   * arbitrary metadata.
   */
  data?: Record<string, string>;
  // Later: optional entity-specific tag display options (e.g. tag prefix)
};

export type FontObject = {
  family: string;
  src: string;
  weight?: string | number;
  style?: 'normal' | 'italic' | 'oblique';
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  unicodeRange?: string;
};

export type ColorScheme = 'light' | 'dark';

export type SurfaceColors = {
  background: string;
  foreground: string;
};

export type AccentColor = {
  primary: string;
  level: 0 | 1 | 2 | 3;
};

export type GrayscaleOptions = {
  hue: number; // 0 - 360 deg
  tint: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  shade?: -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4;
};

export type ModelOption = {
  /** Identifier used when submitting a message. */
  id: string;

  /** Label displayed in the model picker. */
  label: string;

  /** Optional helper text shown with the option. */
  description?: string;

  /** When true the option is visible but cannot be selected. */
  disabled?: boolean;

  /** Determines if the model should be the default selected option. */
  default?: boolean;
};

export type ChatKitTheme = {
  /**
   * The color scheme to use for the ChatKit UI.
   * @default "light"
   */
  colorScheme?: ColorScheme;

  /**
   * Typography
   */
  typography?: {
    /**
     * Base font size in pixels.
     * @remarks Allowed range: 14-18
     */
    baseSize?: 14 | 15 | 16 | 17 | 18;
    fontSources?: FontObject[];
    fontFamily?: string;
    fontFamilyMono?: string;
  };

  /**
   * Determines the overall roundness of the ChatKit UI
   */
  radius?: 'pill' | 'round' | 'soft' | 'sharp';

  /**
   * Determines the overall spacing of the ChatKit UI
   * @default "normal"
   */
  density?: 'compact' | 'normal' | 'spacious';

  /**
   * Color customization options
   */
  color?: {
    grayscale?: GrayscaleOptions;
    accent?: AccentColor;
    surface?: SurfaceColors;
  };
};

type CustomApiConfig = {
  /**
   * The URL (relative or absolute) of the ChatKit API. The configured endpoint
   * must conform to the specification defined in the ChatKit SDK documentation.
   * The easiest way to get started is by using the ChatKit SDK which will help
   * you define your integration in a declarative way.
   */
  url: string;

  /**
   * Custom fetch function to use for API requests. This is useful for
   * overriding the default fetch behavior, such as adding custom headers or
   * setting credentials.
   */
  fetch?: typeof fetch;

  /**
   * The domain key that will be used to verify the registered domain
   * for the integration.
   */
  domainKey: string;

  /**
   * How attachments will be uploaded to your server. Required when attachments are enabled.
   */
  uploadStrategy?: FileUploadStrategy;
};

type HostedApiConfig = {
  /**
   * Function to get a client token or refresh if the current token is expired.
   */
  getClientSecret: (currentClientSecret: string | null) => Promise<string>;
};

export type ChatKitOptions = {
  api: CustomApiConfig | HostedApiConfig;

  /**
   * Locale override for ChatKit UI. If not provided, the browser's locale
   * will be used. If the locale is not supported, will fall back to English.
   *
   * @default navigator.language
   */
  locale?: SupportedLocale;

  /**
   * Visual appearance configuration options for ChatKit.
   * * @default "light"
   */
  theme?: ColorScheme | ChatKitTheme;

  /**
   * The ID of the thread to show when ChatKit is mounted or opened for the first time.
   * Passing `null` will show the new thread view.
   *
   * @default null
   */
  initialThread?: null | string;

  /**
   * A map of handlers for the client tools configured on your server. The keys
   * are the names of the client tools, and the values are functions that
   * will be called when the client tool is invoked. The object (or promise) returned
   * from the function will be sent back to the server as the result of the client
   * tool invocation.
   */
  onClientTool?: ({
    name,
    params,
  }: {
    name: string;
    params: Record<string, unknown>;
  }) => Promise<Record<string, unknown>> | Record<string, unknown>;

  /**
   * Whether to show the header in ChatKit. A configuration object can be
   * provided to customize the header.
   */
  header?: {
    enabled?: boolean;

    /**
     * Configuration for header title display, which defaults to showing thread titles.
     */
    title?: {
      /**
       * @default true
       */
      enabled?: boolean;
      /**
       * Static text to show in the header title area. When not provided, the
       * title of the current thread will be shown instead.
       */
      text?: string;
    };

    /**
     * Configuration for an additional custom button on the left side of the header.
     */
    leftAction?: {
      icon: HeaderIcon;
      onClick: () => void;
    };
    /**
     * Configuration for an additional custom button on the right side of the header.
     */
    rightAction?: {
      icon: HeaderIcon;
      onClick: () => void;
    };
  };

  history?: {
    enabled?: boolean;
    showDelete?: boolean;
    showRename?: boolean;
  };

  startScreen?: {
    /**
     * The greeting text in the new thread view.
     *
     * @default "What can I help with today?"
     */
    greeting?: string;

    /**
     * A list of starter prompts to show above the composer input when in the new thread view.
     */
    prompts?: StartScreenPrompt[];
  };

  threadItemActions?: {
    /**
     * Whether or not to show the response feedback buttons (thumbs up / thumbs
     * down) in the response view. When the user clicks on one of the buttons, the
     * feedback will be sent to your server where you can handle it.
     * @default false
     */
    feedback?: boolean;
    /**
     * Whether or not to show the retry button in the response view.
     * When the user retries a message, server events will be sent to handle
     * removing thread items and begin generation.
     * @default false
     */
    retry?: boolean;
    /**
     * Whether or not to show the share button in the response view.
     * When the user clicks on one of the buttons, the "message.share" event
     * will be emitted with the shared content, item ids, and thread id.
     * @default false
     */
    share?: boolean;
  };

  composer?: {
    /**
     * The placeholder text to show in the composer input.
     * @default "Message the AI"
     */
    placeholder?: string;

    attachments?: {
      /**
       * Whether file attachments are enabled in the composer.
       *
       * @default false
       */
      enabled: boolean;

      /**
       * The maximum size of an attachment in bytes.
       *
       * @default 100 * 1024 * 1024 (100MB)
       */
      maxSize?: number;

      /**
       * The maximum number of attachments that can be sent in a single message.
       *
       * @default 10
       */
      maxCount?: number;

      /**
       *
       * The MIME types and extensions that are accepted for file uploads,
       * similar to [`showOpenFilePicker`]. When not specified, all MIME types
       * and extensions are accepted.
       *
       * [`showOpenFilePicker`]:
       * https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#accept
       */
      accept?: Record<string, string[]>;
    };

    /**
     * When provided a list of tool options, the user will be able to select a tool
     * from a menu in the composer.
     */
    tools?: ToolOption[];

    /** A list of models that users can choose from before sending a message. */
    models?: ModelOption[];
  };

  /**
   * Disclaimer text to display below the composer. Supports links with markdown formatting.
   */
  disclaimer?: {
    text: string;
    highContrast?: boolean;
  };

  entities?: {
    /**
     * Returns a list of entities for the input query.
     * Powers tag autocomplete within the composer.
     */
    onTagSearch?: (query: string) => Promise<Entity[]>;
    onClick?: (entity: Entity) => void;
    onRequestPreview?: (
      entity: Entity,
    ) => Promise<{ preview: Widgets.BasicRoot | null }>;
  };

  widgets?: {
    onAction?: (
      action: { type: string; payload?: Record<string, unknown> },
      widgetItem: { id: string; widget: Widgets.Card | Widgets.ListView },
    ) => Promise<void>;
  };
};

/**
 * All locales for which there is an actual translation file.
 */
export type TranslatedLocale =
  | 'am'
  | 'ar'
  | 'bg-BG'
  | 'bn-BD'
  | 'bs-BA'
  | 'ca-ES'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-DE'
  | 'el-GR'
  | 'es-419'
  | 'es-ES'
  | 'et-EE'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'gu-IN'
  | 'hi-IN'
  | 'hr-HR'
  | 'hu-HU'
  | 'hy-AM'
  | 'id-ID'
  | 'is-IS'
  | 'it-IT'
  | 'ja-JP'
  | 'ka-GE'
  | 'kk'
  | 'kn-IN'
  | 'ko-KR'
  | 'lt'
  | 'lv-LV'
  | 'mk-MK'
  | 'ml'
  | 'mn'
  | 'mr-IN'
  | 'ms-MY'
  | 'my-MM'
  | 'nb-NO'
  | 'nl-NL'
  | 'pa'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'sk-SK'
  | 'sl-SI'
  | 'so-SO'
  | 'sq-AL'
  | 'sr-RS'
  | 'sv-SE'
  | 'sw-TZ'
  | 'ta-IN'
  | 'te-IN'
  | 'th-TH'
  | 'tl'
  | 'tr-TR'
  | 'uk-UA'
  | 'ur'
  | 'vi-VN'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW';

/**
 * All locales that are accepted by ChatKit without falling back to English.
 * Includes language codes that are resolved by ChatKit to a translated locale.
 */
export type SupportedLocale =
  | TranslatedLocale
  | 'bg'
  | 'bn'
  | 'bs'
  | 'ca'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'es'
  | 'et'
  | 'fi'
  | 'fr'
  | 'gu'
  | 'hi'
  | 'hr'
  | 'hu'
  | 'hy'
  | 'id'
  | 'is'
  | 'it'
  | 'ja'
  | 'ka'
  | 'kn'
  | 'ko'
  | 'lv'
  | 'mk'
  | 'mr'
  | 'ms'
  | 'my'
  | 'nb'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'so'
  | 'sq'
  | 'sr'
  | 'sv'
  | 'sw'
  | 'ta'
  | 'te'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh'
  | 'zh-Hant'
  | 'en';

export interface ChatKitElementEventMap {
  'chatkit.error': CustomEvent<{ error: Error }>;
  'chatkit.response.start': CustomEvent<void>;
  'chatkit.response.end': CustomEvent<void>;
  'chatkit.thread.change': CustomEvent<{ threadId: string | null }>;
  'chatkit.log': CustomEvent<{
    name: string;
    data?: Record<string, unknown>;
  }>;
}

export interface ChatKitElement extends HTMLElement {
  setOptions(ChatKitOptions: ChatKitOptions): void;

  focusComposer(): Promise<void>;

  setThreadId(threadId: string | null): Promise<void>;

  sendCustomAction(
    action: { type: string; payload?: Record<string, unknown> },
    /**
     * The ID of the WidgetItem that the action is associated with. You may
     * need this if the action was triggered by a widget, gets handled
     * client-side, and then you want to send the action back to the server to
     * do additional handling.
     *
     * @example
     * ```ts
     * chatKit.options = {
     *   // other options...
     *   widgets: {
     *     async onAction(action, widgetItem) {
     *       await someClientSideHandling(action)
     *       await chatkit.sendAction(action, widgetItem.id)
     *     }
     *   }
     * }
     * ```
     */
    itemId?: string,
  ): Promise<void>;

  sendUserMessage(params: {
    text: string;
    reply?: string;
    attachments?: Attachment[];
    newThread?: boolean;
  }): Promise<void>;

  setComposerValue(params: {
    text: string;
    reply?: string;
    attachments?: Attachment[];
  }): Promise<void>;

  fetchUpdates(): Promise<void>;

  addEventListener<K extends keyof ChatKitElementEventMap>(
    type: K,
    listener: (this: ChatKitElement, ev: ChatKitElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener<K extends keyof ChatKitElementEventMap>(
    type: K,
    listener: (this: ChatKitElement, ev: ChatKitElementEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'oai-chatkit': ChatKitElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      'oai-chatkit': Partial<ChatKitElement>;
    }
  }
}
