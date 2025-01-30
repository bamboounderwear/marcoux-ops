---
title: Projects
slug: /projects
sections:
  - title:
      text: Featured Project
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Check out our latest work
    posts: []
    showThumbnail: true
    showExcerpt: true
    showDate: true
    variant: big-list
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-28
          - pb-0
          - pl-4
          - pr-4
        justifyContent: flex-start
    type: FeaturedPostsSection
    hoverEffect: move-up
styles:
  title:
    textAlign: center
seo:
  metaTitle: Projects - Demo site
  metaDescription: Showcase of our latest work and projects
  socialImage: /images/main-hero.svg
  type: Seo
type: ProjectFeedLayout
numOfProjectsPerPage: 10
projectFeed:
  type: PagedPostsSection
  showThumbnail: true
  showExcerpt: true
  showDate: true
  showClient: true
  variant: three-col-grid
  colors: bg-light-fg-dark
  styles:
    self:
      padding:
        - pt-12
        - pl-4
        - pb-12
        - pr-4
      justifyContent: center
  hoverEffect: move-up
---