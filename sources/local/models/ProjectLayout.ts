import { Model } from '@stackbit/types';

export const ProjectLayout: Model = {
    type: 'page',
    name: 'ProjectLayout',
    label: 'Project',
    labelField: 'title',
    filePath: 'content/pages/projects/{slug}.md',
    fieldGroups: [
        {
            name: 'thumbnail',
            label: 'Thumbnail',
            icon: 'image'
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        },
        {
            name: 'seo',
            label: 'SEO',
            icon: 'page'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
            default: 'This is a new project',
            hidden: false,
            localized: false
        },
        {
            type: 'date',
            name: 'date',
            label: 'Date',
            required: true,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'client',
            label: 'Client',
            required: false,
            default: 'Client name',
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            required: false,
            default: 'Project excerpt',
            hidden: false,
            localized: false,
            group: 'thumbnail'
        },
        {
            type: 'model',
            name: 'featuredImage',
            label: 'Featured image',
            required: false,
            hidden: false,
            localized: false,
            models: ['ImageBlock'],
            group: 'thumbnail'
        },
        {
            type: 'list',
            name: 'bottomSections',
            label: 'Sections',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'model',
                models: [
                    'CarouselSection',
                    'DividerSection',
                    'FeaturedItemsSection',
                    'FeaturedPeopleSection',
                    'GenericSection',
                    'ImageGallerySection',
                    'RecentPostsSection'
                ]
            }
        },
        {
            type: 'slug',
            name: 'slug',
            label: 'Slug',
            description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and project page would be "projects/new-project"',
            required: true,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isFeatured',
            label: 'Featured',
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isDraft',
            label: 'Draft', 
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'model',
            name: 'seo',
            label: 'SEO',
            required: false,
            hidden: false,
            localized: false,
            models: ['Seo'],
            group: 'seo'
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            required: false,
            default: 'bg-light-fg-dark',
            hidden: false,
            localized: false,
            options: [
                {
                    label: 'Light background, dark foreground',
                    value: 'bg-light-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$light',
                    borderColor: '#ececec'
                },
                {
                    label: 'Neutral background, dark foreground',
                    value: 'bg-neutral-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$neutral',
                    borderColor: '#ececec'
                },
                {
                    label: 'Dark background, light foreground',
                    value: 'bg-dark-fg-light',
                    textColor: '$light',
                    backgroundColor: '$dark',
                    borderColor: '#ececec'
                }
            ],
            group: 'cardStyles',
            controlType: 'palette'
        },
        {
            type: 'style',
            name: 'styles',
            label: 'Styles',
            description: 'The styles field is controlled by Netlify Create editor',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96'],
                    flexDirection: '*',
                    borderWidth: ['0:2', '4:8:4'],
                    borderStyle: '*',
                    borderColor: [
                        {
                            value: 'border-dark',
                            label: 'Dark',
                            color: '$dark'
                        },
                        {
                            value: 'border-light',
                            label: 'Light',
                            color: '$light'
                        },
                        {
                            value: 'border-neutral',
                            label: 'Neutral',
                            color: '$neutral'
                        },
                        {
                            value: 'border-neutralAlt',
                            label: 'Neutral alt',
                            color: '$neutralAlt'
                        },
                        {
                            value: 'border-primary',
                            label: 'Primary',
                            color: '$primary'
                        }
                    ],
                    borderRadius: '*',
                    textAlign: '*'
                }
            }
        }
    ]
};