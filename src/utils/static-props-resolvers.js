import {
    getRootPagePath,
    resolveReferences,
    getAllPostsSorted,
    getAllNonFeaturedPostsSorted,
    getAllCategoryPostsSorted,
    getPagedItemsForPage,
    isPublished,
    mapDeepAsync
} from './data-utils';

export function resolveStaticProps(urlPath, data) {
    // get root path of paged path: /blog/page/2 => /blog
    const rootUrlPath = getRootPagePath(urlPath);
    const { __metadata, ...rest } = data.pages.find((page) => page.__metadata.urlPath === rootUrlPath);
    const props = {
        page: {
            __metadata: {
                ...__metadata,
                // override urlPath in metadata with paged path: /blog => /blog/page/2
                urlPath
            },
            ...rest
        },
        ...data.props
    };
    return mapDeepAsync(
        props,
        async (value, keyPath, stack) => {
            const objectType = value?.__metadata?.modelName;
            if (objectType && StaticPropsResolvers[objectType]) {
                const resolver = StaticPropsResolvers[objectType];
                return resolver(value, data, { keyPath, stack });
            }
            return value;
        },
        { postOrder: true }
    );
}

const StaticPropsResolvers = {
    PostLayout: (props, data, debugContext) => {
        return resolveReferences(props, ['author', 'category'], data.objects, debugContext);
    },
    ProjectLayout: (props, data, debugContext) => {
        return resolveReferences(props, [], data.objects, debugContext);
    },
    PostFeedLayout: (props, data) => {
        const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
        let allPosts = getAllNonFeaturedPostsSorted(data.objects);
        if (!process.env.stackbitPreview) {
            allPosts = allPosts.filter(isPublished);
        }
        const paginationData = getPagedItemsForPage(props, allPosts, numOfPostsPerPage);
        const items = resolveReferences(paginationData.items, ['author', 'category'], data.objects);
        return {
            ...props,
            ...paginationData,
            items
        };
    },
    ProjectFeedLayout: (props, data) => {
        const numOfProjectsPerPage = props.numOfProjectsPerPage ?? 10;
        let allProjects = data.objects.filter((object) => object.__metadata?.modelName === 'ProjectLayout' && !object.isFeatured);
        if (!process.env.stackbitPreview) {
            allProjects = allProjects.filter(isPublished);
        }
        allProjects = allProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const paginationData = getPagedItemsForPage(props, allProjects, numOfProjectsPerPage);
        return {
            ...props,
            ...paginationData,
            items: paginationData.items
        };
    },
    PostFeedCategoryLayout: (props, data) => {
        const categoryId = props.__metadata?.id;
        const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
        let categoryPosts = getAllCategoryPostsSorted(data.objects, categoryId);
        if (!process.env.stackbitPreview) {
            categoryPosts = categoryPosts.filter(isPublished);
        }
        const paginationData = getPagedItemsForPage(props, categoryPosts, numOfPostsPerPage);
        const items = resolveReferences(paginationData.items, ['author', 'category'], data.objects);
        return {
            ...props,
            ...paginationData,
            items
        };
    },
    RecentPostsSection: (props, data) => {
        let allPosts = getAllPostsSorted(data.objects);
        if (!process.env.stackbitPreview) {
            allPosts = allPosts.filter(isPublished);
        }
        allPosts = allPosts.slice(0, props.recentCount || 6);
        const recentPosts = resolveReferences(allPosts, ['author', 'category'], data.objects);
        return {
            ...props,
            posts: recentPosts
        };
    },
    FeaturedPostsSection: (props, data, debugContext) => {
        return resolveReferences(props, ['posts.author', 'posts.category'], data.objects, debugContext);
    },
    FeaturedPeopleSection: (props, data, debugContext) => {
        return resolveReferences(props, ['people'], data.objects, debugContext);
    }
};