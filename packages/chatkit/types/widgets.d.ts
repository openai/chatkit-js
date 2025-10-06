export type WidgetRoot = Card | ListView | BasicRoot;

export type WidgetComponent =
  | TextComponent
  | Title
  | Caption
  | Badge
  | Markdown
  | Box
  | Row
  | Col
  | Divider
  | Icon
  | Image
  | Button
  | Checkbox
  | Spacer
  | Select
  | DatePicker
  | Form
  | Input
  | Label
  | RadioGroup
  | Textarea
  | Transition;

// Containers

export type BasicRoot = {
  type: 'Basic';
  key?: string;
  id?: string;
  children: (WidgetComponent | WidgetRoot)[];
  theme?: 'light' | 'dark';
  direction?: 'row' | 'col';
} & Pick<BoxBaseProps, 'gap' | 'padding' | 'align' | 'justify'>;

export type Card = {
  type: 'Card';
  key?: string;
  id?: string;
  asForm?: boolean;
  children: WidgetComponent[];
  background?: string | ThemeColor;
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: number | string | Spacing;
  status?: WidgetStatus;
  collapsed?: boolean;
  confirm?: CardAction;
  cancel?: CardAction;
  theme?: 'light' | 'dark';
};

export type ListView = {
  type: 'ListView';
  key?: string;
  id?: string;
  children: ListViewItem[];
  limit?: number | 'auto';
  status?: WidgetStatus;
  theme?: 'light' | 'dark';
};

// Only used as a direct child of a ListView
export type ListViewItem = {
  type: 'ListViewItem';
  key?: string;
  id?: string;
  children: WidgetComponent[];
  onClickAction?: ActionConfig;
  gap?: number | string;
  align?: Alignment;
};

// Layout Components

export type Box = {
  type: 'Box';
  key?: string;
  id?: string;
  direction?: 'row' | 'col';
} & BoxBaseProps;

export type Row = {
  type: 'Row';
  key?: string;
  id?: string;
} & BoxBaseProps;

export type Col = {
  type: 'Col';
  key?: string;
  id?: string;
} & BoxBaseProps;

export type Form = {
  type: 'Form';
  key?: string;
  id?: string;
  onSubmitAction?: ActionConfig;
  direction?: 'row' | 'col';
} & BoxBaseProps;

export type Spacer = {
  type: 'Spacer';
  key?: string;
  id?: string;
  minSize?: number | string;
};

export type Divider = {
  type: 'Divider';
  key?: string;
  id?: string;
  color?: string | ThemeColor;
  size?: number | string;
  spacing?: number | string;
  flush?: boolean;
};

export type Transition = {
  type: 'Transition';
  key?: string;
  id?: string;
  children: WidgetComponent;
};

// Text Components

export type Title = {
  type: 'Title';
  key?: string;
  id?: string;
  size?: TitleSize;
} & BaseTextProps;

export type Caption = {
  type: 'Caption';
  key?: string;
  id?: string;
  size?: CaptionSize;
} & BaseTextProps;

// Not called Text because Text is already a global in most TS environments
export type TextComponent = {
  type: 'Text';
  key?: string;
  id?: string;
  value: string;
  streaming?: boolean;
  italic?: boolean;
  lineThrough?: boolean;
  width?: number | string;
  size?: TextSize;
  minLines?: number;
  editable?:
    | false
    | {
        name: string;
        autoFocus?: boolean;
        autoSelect?: boolean;
        autoComplete?: string;
        allowAutofillExtensions?: boolean;
        pattern?: string;
        placeholder?: string;
        required?: boolean;
      };
} & BaseTextProps;

export type Markdown = {
  type: 'Markdown';
  key?: string;
  id?: string;
  value: string;
  streaming?: boolean;
};

// Content Components

export type Badge = {
  type: 'Badge';
  key?: string;
  id?: string;
  label: string;
  color?: 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery';
  variant?: 'solid' | 'soft' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
};

export type Icon = {
  type: 'Icon';
  key?: string;
  id?: string;
  name: WidgetIcon;
  color?: string | ThemeColor;
  size?: IconSize;
};

export type Image = {
  type: 'Image';
  key?: string;
  id?: string;
  src: string;
  alt?: string;
  frame?: boolean;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  position?:
    | 'top left'
    | 'top'
    | 'top right'
    | 'left'
    | 'center'
    | 'right'
    | 'bottom left'
    | 'bottom'
    | 'bottom right';
  flush?: boolean;
} & BlockProps;

export type Button = {
  type: 'Button';
  key?: string;
  id?: string;
  submit?: boolean;
  label?: string;
  onClickAction?: ActionConfig;
  iconStart?: WidgetIcon;
  iconEnd?: WidgetIcon;
  style?: 'primary' | 'secondary';
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'discovery'
    | 'success'
    | 'caution'
    | 'warning'
    | 'danger';

  variant?: ControlVariant;
  size?: ControlSize;
  pill?: boolean;
  uniform?: boolean;
  block?: boolean;
  disabled?: boolean;
};

// Form Controls

export type Input = {
  type: 'Input';
  key?: string;
  id?: string;
  name: string;
  inputType?: 'number' | 'email' | 'text' | 'password' | 'tel' | 'url';
  defaultValue?: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  allowAutofillExtensions?: boolean;
  autoSelect?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  variant?: 'soft' | 'outline';
  size?: ControlSize;
  gutterSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  pill?: boolean;
};

export type Textarea = {
  type: 'Textarea';
  key?: string;
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  autoSelect?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  variant?: 'soft' | 'outline';
  size?: ControlSize;
  gutterSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rows?: number;
  autoResize?: boolean;
  maxRows?: number;
  allowAutofillExtensions?: boolean;
};

export type Select = {
  type: 'Select';
  key?: string;
  id?: string;
  name: string;
  options: { value: string; label: string }[];
  onChangeAction?: ActionConfig;
  placeholder?: string;
  defaultValue?: string;
  variant?: ControlVariant;
  size?: ControlSize;
  pill?: boolean;
  block?: boolean;
  clearable?: boolean;
  disabled?: boolean;
};

export type DatePicker = {
  type: 'DatePicker';
  key?: string;
  id?: string;
  name: string;
  onChangeAction?: ActionConfig;
  placeholder?: string;
  defaultValue?: string; // ISO datetime
  min?: string; // ISO datetime
  max?: string; // ISO datetime
  variant?: ControlVariant;
  size?: ControlSize;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  pill?: boolean;
  block?: boolean;
  clearable?: boolean;
  disabled?: boolean;
};

export type Checkbox = {
  type: 'Checkbox';
  key?: string;
  id?: string;
  name: string;
  label?: string;
  defaultChecked?: string;
  onChangeAction?: ActionConfig;
  disabled?: boolean;
  required?: boolean;
};

export type RadioGroup = {
  type: 'RadioGroup';
  key?: string;
  id?: string;
  name: string;
  options?: { label: string; value: string; disabled?: boolean }[];
  ariaLabel?: string;
  onChangeAction?: ActionConfig;
  defaultValue?: string;
  direction?: 'row' | 'col';
  disabled?: boolean;
  required?: boolean;
};

export type Label = {
  type: 'Label';
  key?: string;
  id?: string;
  value: string;
  fieldName: string;
  size?: TextSize;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  textAlign?: TextAlign;
  color?: string | ThemeColor;
};

// Shared types

type ThemeColor = { dark: string; light: string };

type Spacing = {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  x?: number | string;
  y?: number | string;
};

type Border = {
  size: number;
  color?: string | ThemeColor;
  style?:
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
};

type Borders = {
  top?: number | Border;
  right?: number | Border;
  bottom?: number | Border;
  left?: number | Border;
  x?: number | Border;
  y?: number | Border;
};

type RadiusValue =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | 'full'
  | '100%'
  | 'none';

type Alignment = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Justification =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

type ControlVariant = 'solid' | 'soft' | 'outline' | 'ghost';
type ControlSize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

type TextAlign = 'start' | 'center' | 'end';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TitleSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type CaptionSize = 'sm' | 'md' | 'lg';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type WidgetStatus =
  | {
      text: string;
      favicon?: string;
      frame?: boolean;
    }
  | {
      text: string;
      icon?: WidgetIcon;
    };

type ActionConfig = { type: string; payload?: Record<string, unknown> };

type CardAction = { label: string; action: ActionConfig };

type BlockProps = {
  height?: number | string;
  width?: number | string;
  size?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  minSize?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  maxSize?: number | string;
  aspectRatio?: number | string;
  radius?: RadiusValue;
  margin?: number | string | Spacing;
};

type BoxBaseProps = {
  children?: WidgetComponent[];
  align?: Alignment;
  justify?: Justification;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: number | string;
  gap?: number | string;
  padding?: number | string | Spacing;
  border?: number | Border | Borders;
  background?: string | ThemeColor;
} & BlockProps;

type BaseTextProps = {
  value: string;
  color?: string | ThemeColor;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  textAlign?: TextAlign;
  truncate?: boolean;
  maxLines?: number;
};

export type WidgetIcon =
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
  | 'desktop'
  | 'document'
  | 'dot'
  | 'dots-horizontal'
  | 'dots-vertical'
  | 'empty-circle'
  | 'external-link'
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
  | 'mobile'
  | 'name'
  | 'notebook'
  | 'notebook-pencil'
  | 'page-blank'
  | 'phone'
  | 'play'
  | 'plus'
  | 'profile'
  | 'profile-card'
  | 'reload'
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
