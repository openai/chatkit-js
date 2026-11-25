import type { ChatKitIcon, Widgets } from '../types';

declare const sharedIcon: ChatKitIcon;

const icons: Widgets.WidgetIcon[] = [
  sharedIcon,
  'dot',
  'clock',
  'lucide:settings',
  'lucide:play',
  'lucide:music',
  'vendor:example',
];

const button: Widgets.Button = {
  type: 'Button',
  iconStart: 'lucide:settings',
  iconEnd: 'clock',
};

const icon: Widgets.Icon = {
  type: 'Icon',
  name: 'lucide:music',
};

// @ts-expect-error Unknown, unprefixed icon names are not accepted.
const invalid: Widgets.WidgetIcon = 'not-a-chatkit-icon';
