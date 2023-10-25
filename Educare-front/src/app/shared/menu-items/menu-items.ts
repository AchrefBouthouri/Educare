import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}


const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'login', type: 'link', name: 'User', icon: 'person' },
  {
    state: 'order',
    type: 'sub',
    name: 'Restaurant',
    icon: 'food_bank',
    children: [
      { state: 'order', type: 'link', name: 'Order', icon: 'shopping_cart' },
      { state: 'capacity', type: 'link', name: 'Capacity', icon: 'shopping_cart' },
      { state: 'calories', type: 'link', name: 'Calories', icon: 'shopping_cart' },
      { state: 'other', type: 'link', name: 'Other', icon: 'shopping_cart' }
    ]
  },
  { state: 'foyer', type: 'sub', name: 'Foyer', icon: 'domain' },
  // { state: 'booking', type: 'link', name: 'Booking Management', icon: 'view_comfy' },
  // { state: 'romm', type: 'link', name: 'Room Management', icon: 'domain' },
  // { state: 'foyer', type: 'link', name: 'Dorm-front', icon: 'blur_circular' },
  { state: 'forum', type: 'link', name: 'Forum', icon: 'forum' },
  { state: 'reclamation', type: 'sub', name: 'Reclamation', icon: 'assignment' },

  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // { state: 'expansion', type: 'link', name: 'Expansion Panel', icon: 'vertical_align_center'},
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // { state: 'progress-snipper', type: 'link', name: 'Progress snipper', icon: 'border_horizontal'},
  // { state: 'progress', type: 'link', name: 'Progress Bar', icon: 'blur_circular'},
  // { state: 'dialog', type: 'link', name: 'Dialog', icon: 'assignment_turned_in'},
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // { state: 'slide-toggle', type: 'link', name: 'Slide Toggle', icon: 'all_inclusive'}
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
