import type * as Widgets from './widgets';

export type { Widgets };

export type ChatKitOptions = {
  /**
   * Configuration for how ChatKit communicates with your backend.
   */
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
   *
   * @default "light"
   */
  theme?: ColorScheme | ThemeOption;

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
  onClientTool?: (toolCall: {
    name: string;
    params: Record<string, unknown>;
  }) => Promise<Record<string, unknown>> | Record<string, unknown>;

  /**
   * Configuration for the header.
   *
   * @see {@link HeaderOption}
   */
  header?: HeaderOption;

  /**
   * Configuration for the history panel.
   *
   * @see {@link HistoryOption}
   */
  history?: HistoryOption;

  /**
   * Configuration for the start screen.
   *
   * @see {@link StartScreenOption}
   */
  startScreen?: StartScreenOption;

  /**
   * Configuration for the thread item actions.
   *
   * @see {@link ThreadItemActionsOption}
   */
  threadItemActions?: ThreadItemActionsOption;

  /**
   * Configuration for the composer.
   *
   * @see {@link ComposerOption}
   *
   */
  composer?: ComposerOption;

  /**
   * Configuration for disclaimer text.
   *
   * @see {@link DisclaimerOption}
   */
  disclaimer?: DisclaimerOption;

  /**
   * Configuration for entities tags.
   *
   * @see {@link EntitiesOption}
   */
  entities?: EntitiesOption;

  /**
   * Configuration for widgets.
   *
   * @see {@link WidgetsOption}
   */
  widgets?: WidgetsOption;
};

export type HeaderOption = {
  /**
   * Enables or disables the header UI.
   */
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

export type HistoryOption = {
  /** Enables the history panel. */
  enabled?: boolean;
  /** Shows the delete action for threads. */
  showDelete?: boolean;
  /** Shows the rename action for threads. */
  showRename?: boolean;
};

export type StartScreenOption = {
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

export type WidgetsOption = {
  /**
   * Called when a widget action is triggered.
   * See https://openai.github.io/chatkit/guides/widget-actions/ for details.
   */
  onAction?: (
    action: { type: string; payload?: Record<string, unknown> },
    widgetItem: { id: string; widget: Widgets.Card | Widgets.ListView },
  ) => Promise<void>;
};

export type EntitiesOption = {
  /**
   * Returns a list of entities for the input query.
   * Powers tag autocomplete within the composer.
   */
  onTagSearch?: (query: string) => Promise<Entity[]>;
  /** Called when a rendered entity is clicked. */
  onClick?: (entity: Entity) => void;
  /**
   * Use the Widget Studio (https://widget-studio.vercel.app/) to design
   * previews and copy the generated JSON into your integration.
   */
  onRequestPreview?: (
    entity: Entity,
  ) => Promise<{ preview: Widgets.BasicRoot | null }>;
};

export type DisclaimerOption = {
  /** Markdown text displayed below the composer. */
  text: string;
  /** When true, increases contrast for the disclaimer text. */
  highContrast?: boolean;
};

export type ThreadItemActionsOption = {
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
};

export type ComposerOption = {
  /**
   * The placeholder text to show in the composer input.
   * @default "Message the AI"
   */
  placeholder?: string;
  /**
   * Configuration for file attachments in the composer. If not provided,
   * attachments will be disabled.
   */
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
 * Built-in icon names used by ChatKit for buttons and UI affordances.
 */
export type ChatKitIcon =
  | 'agent'
  | 'analytics'
  | 'atom'
  | 'batch'
  | 'bolt'
  | 'book-open'
  | 'book-closed'
  | 'book-clock'
  | 'bug'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'check-circle'
  | 'check-circle-filled'
  | 'chevron-left'
  | 'chevron-right'
  | 'circle-question'
  | 'compass'
  | 'confetti'
  | 'cube'
  | 'document'
  | 'dots-horizontal'
  | 'empty-circle'
  | 'globe'
  | 'keys'
  | 'lab'
  | 'images'
  | 'info'
  | 'lifesaver'
  | 'lightbulb'
  | 'mail'
  | 'map-pin'
  | 'maps'
  | 'name'
  | 'notebook'
  | 'notebook-pencil'
  | 'page-blank'
  | 'phone'
  | 'plus'
  | 'profile'
  | 'profile-card'
  | 'star'
  | 'star-filled'
  | 'search'
  | 'sparkle'
  | 'sparkle-double'
  | 'square-code'
  | 'square-image'
  | 'square-text'
  | 'suitcase'
  | 'settings-slider'
  | 'user'
  | 'wreath'
  | 'write'
  | 'write-alt'
  | 'write-alt2';

export type StartScreenPrompt = {
  /** Human-readable label shown for the prompt. */
  label: string;
  /** Text inserted into the composer when the prompt is chosen. */
  prompt: string;
  /** Optional icon displayed with the prompt. */
  icon?: ChatKitIcon;
};

/**
 * See https://openai.github.io/chatkit-python-sdk/guides/uploads for
 * strategies to host files before attaching them to messages.
 */

/**
 * Attachment associated with a user message. When passed to `sendUserMessage` or
 * `setComposerValue`, it must already be uploaded by your server. We do not currently
 * support attaching raw Files to a message.
 */
export type Attachment =
  | {
      type: 'file';
      /** Server-generated identifier for the uploaded file. */
      id: string;
      /** Original filename shown in the UI. */
      name: string;
      /** MIME type of the file. */
      mime_type: string;
    }
  | {
      type: 'image';
      /** Server-generated identifier for the uploaded image. */
      id: string;
      /** URL used to render the image preview in the UI. */
      preview_url: string;
      /** Original filename shown in the UI. */
      name: string;
      /** MIME type of the image. */
      mime_type: string;
    };

/**
 * Icon names supported for header buttons and controls.
 */
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

/**
 * Describes a selectable tool shown in the composer.
 */
export type ToolOption = {
  id: string;

  /** Label displayed in the tool menu */
  label: string;

  /** Icon displayed next to the tool in the menu. */
  icon: ChatKitIcon;

  /** Optional label displayed in the button when the tool is selected. */
  shortLabel?: string;

  /** Optional placeholder text to show in the composer input when the tool is selected. */
  placeholderOverride?: string;

  /**
   * Whether the tool is pinned to the composer outside of the tool menu.
   *
   * @default false
   */
  pinned?: boolean;
};

/**
 * Strategy used to upload files referenced by composer attachments.
 */
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

/**
 * A webfont source used by ChatKit typography.
 */
export type FontObject = {
  /** CSS font-family name. */
  family: string;
  /** URL of the font file. */
  src: string;
  /** Font weight. */
  weight?: string | number;
  /** Font style. */
  style?: 'normal' | 'italic' | 'oblique';
  /** Font rendering behavior. */
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  /** Optional unicode range descriptor. */
  unicodeRange?: string;
};

/**
 * Deprecated: use `ChatKitOptions.ColorScheme` instead.
 */
// export type ColorScheme = 'light' | 'dark'

/**
 * Colors for container backgrounds and foreground content.
 */
export type SurfaceColors = {
  /** Background color for surfaces. */
  background: string;
  /** Foreground color (text/icon) for surfaces. */
  foreground: string;
};

/**
 * Primary accent color used throughout the UI.
 */
export type AccentColor = {
  /** Hex, rgb(a), hsl(a), etc. */
  primary: string;
  /** Intensity level for the accent palette. */
  level: 0 | 1 | 2 | 3;
};

/**
 * Controls the grayscale palette derived from the given hue.
 */
export type GrayscaleOptions = {
  /** Hue in degrees (0–360). */
  hue: number;
  /** Tint step applied to the grayscale palette. */
  tint: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /** Optional shade adjustment applied to the palette. */
  shade?: -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4;
};

/** Selectable model option shown to end users. */
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

export type CustomApiConfig = {
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

export type HostedApiConfig = {
  /**
   * Function to get a client token or refresh if the current token is expired.
   */
  getClientSecret: (currentClientSecret: string | null) => Promise<string>;
};

/** The color scheme to use for the ChatKit UI. */
export type ColorScheme = 'light' | 'dark';

export type EventHandler<K extends keyof ChatKitEvents> = (
  event: ChatKitEvents[K],
) => any;

/** Visual appearance configuration options for ChatKit. */
export type ThemeOption = {
  /**
   * The color scheme to use for the ChatKit UI.
   * @default "light"
   */
  colorScheme?: ColorScheme;

  /**
   * Typography customization options.
   *
   * @see {@link TypographyOption}
   */
  typography?: TypographyOption;

  /**
   * Determines the overall roundness of the ChatKit UI.
   *
   * @default "pill"
   */
  radius?: 'pill' | 'round' | 'soft' | 'sharp';

  /**
   * Determines the overall spacing of the ChatKit UI
   * @default "normal"
   */
  density?: 'compact' | 'normal' | 'spacious';

  /**
   * Color customization options.
   *
   * @see {@link ColorOption}
   */
  color?: ColorOption;
};

export type TypographyOption = {
  /** Base font size in pixels. */
  baseSize?: 14 | 15 | 16 | 17 | 18;
  fontSources?: FontObject[];
  fontFamily?: string;
  fontFamilyMono?: string;
};

export type ColorOption = {
  grayscale?: GrayscaleOptions;
  accent?: AccentColor;
  surface?: SurfaceColors;
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

/**
 * A Web Component that serves as the entry point for a ChatKit integration.
 * * @noInheritDoc
 */
export interface OpenAIChatKit extends HTMLElement {
  /**
   * Applies configuration options to the ChatKit instance.
   *
   * **IMPORTANT**: New options are not merged with the existing options. You must provide a full set of options every time you call this method.
   */
  setOptions(options: ChatKitOptions): void;

  /** Focuses the composer input field. */
  focusComposer(): Promise<void>;

  /** Changes the active thread. Pass `null` to switch to a new thread. */
  setThreadId(threadId: string | null): Promise<void>;

  /**
   * Sends a custom application-defined action to your backend.
   * See https://openai.github.io/chatkit/guides/widget-actions/ for more details.
   */
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

  /** Sends a user message. */
  sendUserMessage(params: {
    text: string;
    reply?: string;
    attachments?: Attachment[];
    newThread?: boolean;
  }): Promise<void>;

  /** Sets the composer's content without sending a message. */
  setComposerValue(params: {
    text: string;
    reply?: string;
    attachments?: Attachment[];
  }): Promise<void>;

  /**
   * Manually fetches updates from the server.
   *
   * Use this when you've manually updated the thread or thread items and need to sync them with the client.
   */
  fetchUpdates(): Promise<void>;

  /**
   * Adds an event listener for the specified {@link ChatKitEvents} event.
   *
   * @example
   * ```ts
   * chatKit.addEventListener('chatkit.error', (event) => {
   *   logToMyErrorLogger(event.detail.error);
   * });
   * ```
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
   */
  addEventListener<K extends keyof ChatKitEvents>(
    /**
     * See {@link ChatKitEvents} for available events.
     */
    type: K,
    /**
     * The event listener callback.
     */
    listener: EventHandler<K>,
    /**
     * An object that specifies characteristics about the event listener.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options}
     */
    options?: boolean | AddEventListenerOptions,
  ): void;

  /** @internal */
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;

  /**
   * Removes an event listener for the specified event.
   *
   * @example
   * ```ts
   * chatKit.removeEventListener('chatkit.error', myErrorListener);
   * ```
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
   */
  removeEventListener<K extends keyof ChatKitEvents>(
    /**
     * See {@link ChatKitEvents} for available events.
     */
    type: K,
    /**
     * The event listener callback to remove.
     */
    listener: EventHandler<K>,
    /**
     * An object that specifies characteristics about the event listener.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#options}
     */
    options?: boolean | EventListenerOptions,
  ): void;

  /** @internal */
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void;
}

/**
 * DOM events emitted by the `openai-chatkit` custom element.
 */
export type ChatKitEvents = {
  /** Emitted when an error occurs. You should log these for monitoring and debugging. */
  'chatkit.error': CustomEvent<{ error: Error }>;

  /** Emitted when the assistant begins sending a response. */
  'chatkit.response.start': CustomEvent<void>;

  /** Emitted when the assistant finishes sending a response. */
  'chatkit.response.end': CustomEvent<void>;

  /** Emitted when the active thread changes. Use this along with `initialThread` to persist the current thread across page loads or sessions. */
  'chatkit.thread.change': CustomEvent<{ threadId: string | null }>;

  /** Emitted when ChatKit starts loading a thread (initial load or selected from history). */
  'chatkit.thread.load.start': CustomEvent<{ threadId: string }>;

  /** Emitted when ChatKit finished loading a thread. */
  'chatkit.thread.load.end': CustomEvent<{ threadId: string }>;

  /** Diagnostic events that can be used for logging/analytics. */
  'chatkit.log': CustomEvent<{
    name: string;
    data?: Record<string, unknown>;
  }>;
};
