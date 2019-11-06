declare module '@keystonejs/fields' {
    export class AutoIncrement {}
    export class CalendarDay {}
    export class CheckBox {}
    export class CloudinaryImage {}

    export class Checkbox {}
    export class Password {}
    export class Text {}

    export type FieldType = AutoIncrement | Checkbox | Password | Text;
}
