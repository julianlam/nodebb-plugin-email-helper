# Email Helper plugin for NodeBB

This plugin helps you test your email templates without going through an emailer plugin (or sending real emails).

It exposes a set of routes under `/email-helper/<template>` that you can access to test emails. For example, to test
your digest changes, navigate to `https://your.site/email-helper/digest`.

This plugin does not interfere with any existing email plugins, they will continue to function as before.