import * as React from 'react';
import classNames from 'classnames';

import Link from '../../atoms/Link';
import { getComponent } from '../../components-registry';
import { getBaseLayoutComponent } from '../../../utils/base-layout';
import ChevronLeftIcon from '../../svgs/chevron-left';
import ChevronRightIcon from '../../svgs/chevron-right';

export default function PostFeedLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const { title, topSections = [], bottomSections = [], pageIndex, baseUrlPath, numOfPages, items, postFeed, projectFeed } = page;
    const PostFeedSection = getComponent('PostFeedSection');
    const pageLinks = PageLinks({ pageIndex, baseUrlPath, numOfPages });
    const feedProps = page.__metadata?.modelName === 'ProjectFeedLayout' ? projectFeed : postFeed;

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-page-layout">
                {title && (
                    <h1 className="sr-only" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                        {title}
                    </h1>
                )}
                {renderSections(topSections, 'topSections', enableAnnotations)}
                <PostFeedSection
                    {...feedProps}
                    posts={items}
                    pageLinks={pageLinks}
                    enableAnnotations={enableAnnotations}
                    {...(enableAnnotations && { 'data-sb-field-path': page.__metadata?.modelName === 'ProjectFeedLayout' ? 'projectFeed' : 'postFeed' })}
                />
                {renderSections(bottomSections, 'bottomSections', enableAnnotations)}
            </main>
        </BaseLayout>
    );
}

function renderSections(sections, fieldName, enableAnnotations) {
    if (sections.length === 0) {
        return null;
    }
    return (
        <div {...(enableAnnotations && { 'data-sb-field-path': fieldName })}>
            {sections.map((section, index) => {
                const Component = getComponent(section.__metadata.modelName);
                if (!Component) {
                    throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                }
                return (
                    <Component
                        key={index}
                        {...section}
                        enableAnnotations={enableAnnotations}
                        {...(enableAnnotations && { 'data-sb-field-path': `${fieldName}.${index}` })}
                    />
                );
            })}
        </div>
    );
}

function PageLinks({ pageIndex, baseUrlPath, numOfPages }) {
    if (numOfPages < 2) {
        return null;
    }
    const pageLinks = [];
    const padRange = 2;
    const startIndex = pageIndex - padRange > 2 ? pageIndex - padRange : 0;
    const endIndex = pageIndex + padRange < numOfPages - 3 ? pageIndex + padRange : numOfPages - 1;

    if (pageIndex > 0) {
        pageLinks.push(
            <PageLink key="prev" pageIndex={pageIndex - 1} baseUrlPath={baseUrlPath}>
                <ChevronLeftIcon className="fill-current h-6 w-6" />
            </PageLink>
        );
    } else {
        pageLinks.push(
            <PageLinkDisabled key="prev">
                <ChevronLeftIcon className="fill-current h-6 w-6" />
            </PageLinkDisabled>
        );
    }

    if (startIndex > 0) {
        pageLinks.push(
            <PageLink key="0" pageIndex={0} baseUrlPath={baseUrlPath}>
                1
            </PageLink>
        );
        if (startIndex > 1) {
            pageLinks.push(<Ellipsis key="beforeEllipsis" />);
        }
    }

    for (let i = startIndex; i <= endIndex; i++) {
        if (pageIndex === i) {
            pageLinks.push(<PageLinkDisabled key={i}>{i + 1}</PageLinkDisabled>);
        } else {
            pageLinks.push(
                <PageLink key={i} pageIndex={i} baseUrlPath={baseUrlPath}>
                    {i + 1}
                </PageLink>
            );
        }
    }

    if (endIndex < numOfPages - 1) {
        if (endIndex < numOfPages - 2) {
            pageLinks.push(<Ellipsis key="afterEllipsis" />);
        }
        pageLinks.push(
            <PageLink key={numOfPages - 1} pageIndex={numOfPages - 1} baseUrlPath={baseUrlPath}>
                {numOfPages}
            </PageLink>
        );
    }

    if (pageIndex < numOfPages - 1) {
        pageLinks.push(
            <PageLink key="next" pageIndex={pageIndex + 1} baseUrlPath={baseUrlPath}>
                <ChevronRightIcon className="fill-current h-6 w-6" />
            </PageLink>
        );
    } else {
        pageLinks.push(
            <PageLinkDisabled key="next">
                <ChevronRightIcon className="fill-current h-6 w-6" />
            </PageLinkDisabled>
        );
    }

    return <div className={classNames('flex flex-row flex-wrap items-center gap-2 mt-12 sm:mt-20')}>{pageLinks}</div>;
}

function PageLink({ pageIndex, baseUrlPath, children }) {
    return (
        <Link href={urlPathForPageAtIndex(pageIndex, baseUrlPath)} className="sb-component-button sb-component-button-secondary shrink-0 text-sm p-0 w-10 h-10">
            {children}
        </Link>
    );
}

function PageLinkDisabled({ children }) {
    return (
        <span key="next" className="sb-component-button sb-component-button-secondary opacity-25 shrink-0 text-sm p-0 w-10 h-10 pointer-events-none">
            {children}
        </span>
    );
}

function Ellipsis() {
    return <span className="text-2xl p-1">&hellip;</span>;
}

function urlPathForPageAtIndex(pageIndex, baseUrlPath) {
    return pageIndex === 0 ? baseUrlPath : `${baseUrlPath}/page/${pageIndex + 1}`;
}