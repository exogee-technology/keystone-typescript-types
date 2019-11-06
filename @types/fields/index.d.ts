declare module '@keystonejs/fields' {
    export class AutoIncrement {}
    export class CalendarDay {}
    export class Checkbox {}
    export class CloudinaryImage {}
    export class Color {}
    export class Content {}
    export class DateTime {}
    export class DateTimeUtc {}
    export class Decimal {}
    export class File {}
    export class Float {}
    export class Integer {}
    export class Location {}
    export class Markdown {}
    export class MongoId {}
    export class OEmbed {}
    export class Password {}
    export class Relationship {}
    export class Select {}
    export class Slug {}
    export class Text {}
    export class Unsplash {}
    export class Url {}
    export class Uuid {}
    export class Wysiwyg {}

    export type FieldType =
        | AutoIncrement
        | CalendarDay
        | Checkbox
        | CloudinaryImage
        | Color
        | Content
        | DateTime
        | DateTimeUtc
        | Decimal
        | File
        | Float
        | Integer
        | Location
        | Markdown
        | MongoId
        | OEmbed
        | Password
        | Relationship
        | Select
        | Slug
        | Text
        | Unsplash
        | Url
        | Uuid
        | Wysiwyg;
}
