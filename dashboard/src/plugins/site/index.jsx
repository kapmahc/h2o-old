import SiteStatus from './admin/Status'

export default {
  dashboard (user){
    var items = []
    if (user.uid) {
      items.push({
        label: "site.dashboard.title",
        icon: "settings",
        items: [
          {
            label: "site.admin.status.title",
            to: "/admin/site/status",
            icon: "info_outline"
          },
          null,
          {
            label: "site.admin.info.title",
            to: "/admin/site/info",
            icon: "info_outline"
          },
          {
            label: "site.admin.author.title",
            to: "/admin/site/author",
            icon: "info_outline"
          },
          {
            label: "site.admin.seo.title",
            to: "/admin/site/seo",
            icon: "info_outline"
          },
          {
            label: "site.admin.smtp.title",
            to: "/admin/site/smtp",
            icon: "info_outline"
          },
          null,
          {
            label: "site.admin.posts.index.title",
            to: "/admin/posts",
            icon: "info_outline"
          },
          {
            label: "site.admin.notices.index.title",
            to: "/admin/notices",
            icon: "info_outline"
          },
          {
            label: "site.admin.leave-words.index.title",
            to: "/admin/leave-words",
            icon: "info_outline"
          },
          null,
          {
            label: "site.admin.users.index.title",
            to: "/admin/users",
            icon: "info_outline"
          },
          {
            label: "site.admin.locales.index.title",
            to: "/admin/locales",
            icon: "info_outline"
          },
          null,
          {
            label: "site.admin.links.index.title",
            to: "/admin/links",
            icon: "info_outline"
          },
          {
            label: "site.admin.pages.index.title",
            to: "/admin/pages",
            icon: "info_outline"
          },
        ]
      })
    }
    return items
  },
  routes: [
    {path: "/admin/site/status", component: SiteStatus},
  ]
}
