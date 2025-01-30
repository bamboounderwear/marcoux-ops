import { Model } from '@stackbit/types';

export const ProjectFeedLayout: Model = {
    type: 'page',
    name: 'ProjectFeedLayout',
    label: 'Projects',
    labelField: 'title',
    singleInstance: true,
    filePath: 'content/pages/projects/index.md',
    fieldGroups: [
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
            required: false,
            default: 'Projects',
            hidden: false,
            localized: false
        },
        {
            type: 'model',
            name: 'projectFeed',
            label: 'Project feed',
            required: false,
            hidden: false,
            localized: false,
            models: ['PagedPostsSection'],
            readOnly: true
        },
        {
            type: 'number',
            name: 'numOfProjectsPerPage',
            label: 'Number of projects per page',
            description: 'Set to 0 to show all projects on a single page',
            required: false,
            default: 10,
            hidden: false,
            localized: false,
            subtype: 'int'
        },
        {
            type: 'list',
            name: 'topSections',
            label: 'Top sections',
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
            type: 'list',
            name: 'bottomSections',
            label: 'Bottom sections',
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
            description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and project page would be "projects"',
            required: true,
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
            type: 'style',
            name: 'styles',
            label: 'Styles',
            description: 'The styles field is controlled by Netlify Create editor',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                title: {
                    textAlign: '*'
                }
            }
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
        }
    ]
};