module.exports = function (context, options) {
    return {
      name: 'docusaurus-beamer-plugin',
      injectHtmlTags() {
        return {
          
          postBodyTags: [
            `<script>
            var beamer_config = {
              product_id : 'adVcqdMO51854', //DO NOT CHANGE: This is your product code on Beamer
              selector : '.header-beamer-link',
            };
          </script>
          <script type="text/javascript" src="https://app.getbeamer.com/js/beamer-embed.js" defer="defer"></script>`
          ],
        };
      },
    };
  };