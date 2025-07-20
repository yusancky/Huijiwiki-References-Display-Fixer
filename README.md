# Huijiwiki-References-Display-Fixer

Huijiwiki-References-Display-Fixer is a MediaWiki gadget that fixes display issues in Huijiwiki's reference system. This gadget prevents an issue caused by Huijiwiki's default frontend settings, where the content under the `References` section is collapsed by default and fails to display properly when expanded.

## Quick Start

To get started with Huijiwiki-References-Display-Fixer, follow the steps below:

### Define the Gadget

1. Upload `main.js` and `main.css` to your MediaWiki site, typically under the `Gadget:Huijiwiki-References-Display-Fixer.js` and `Gadget:Huijiwiki-References-Display-Fixer.css` pages, respectively.
2. Define the gadget in your `MediaWiki:Gadgets-definition` page.
   ```wikitext
   * Huijiwiki-References-Display-Fixer[ResourceLoader|default]| Huijiwiki-References-Display-Fixer.js | Huijiwiki-References-Display-Fixer.css
   ```

### Set Up the Notification Page

1. Upload `notification.html` to a static web host that provides a direct URL (e.g., GitHub Pages or Netlify).
2. Edit the `main.js` file and replace the string `"notification.html"` with the full URL of your hosted `notification.html` page.

### Test the Gadget

Enable the gadget from your user preferences and visit a page where it's expected to run. If set up correctly and run successfully, you should see that the previously collapsed content under the `References` section is no longer collapsible and is displayed correctly.

## License

Copyright (C) 2025 yusancky

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
