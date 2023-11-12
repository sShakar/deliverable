import { Dialog, Loading, Notify, Quasar, SessionStorage } from 'quasar';
import type { QuasarPluginOptions } from 'quasar';
import quasarIconSet from 'quasar/icon-set/material-icons-outlined';
// Import icon libraries
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

const options: Partial<QuasarPluginOptions> = {
	plugins: {
		SessionStorage,
		Dialog,
		Loading,
		Notify
	}, // import Quasar plugins and add here
	iconSet: quasarIconSet,
	config: {
		screen: {
			bodyClasses: true
		},
		notify: {
			position: 'top',
			timeout: 2000,
			actions: [
				{
					icon: 'mdi-close',
					color: 'white',
					round: true,
					handler: () => {
						/* ... */
					}
				}
			]
		}
	}
};

export { Quasar, options };
