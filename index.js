/**
 * @file semi opacity notify plugin for zds v2.0
 * @version 0.1 (2017/9/21)
 * @author yuanyuan07
 *
 *
 * type: 'success' 'warn' 'failure' 'loading' 'text' ''
 * message: message to show
 * usage: this.$lightNotify({
 *  type: 'success',
 *  message: 'success!',
 *  always: false
 * });
 * ***/

export default {
    install(Vue, options) {
        this.type = '';
        this.message = '';
        this.always = false;
        this.timeout = 1000;

        this.$el = null;
        this.$timer = null;

        let t = this;
        this.insertEl = function () {
            if (document.getElementsByClassName('semi-opacity-notify-modal').length) {
                this.removeEl();
            }

            let NotifyTpl = Vue.extend({
                data() {
                    return {
                        type: t.type || '',
                        text: t.message
                    };
                },
                template: `
                    <div class="semi-opacity-notify-modal">
                        <div class="opacity-tip" :class="{text: type === 'text'}">
                            <span class="icon" :class="type"></span>
                            <p v-html="text"></p>
                        </div>
                    </div>`
            });
            let tpl = new NotifyTpl().$mount().$el;
            let body = document.body;
            body.style.overflow = 'hidden';
            body.appendChild(tpl);
            this.$el = tpl;

            // let tip = tpl.children[0];
            // let tipWidth = tip.getBoundingClientRect().width;
            // tip.style.marginLeft = 0 - tipWidth / 2 + 'px';

            if (!this.always) {
                this.$timer = setTimeout(() => {
                    t.removeEl();
                }, t.timeout);
            }
        };

        this.removeEl = function () {
            clearTimeout(t.$timer);
            let body = document.body;
            body.removeChild(t.$el);
            if (body.style.removeProperty) {
                body.style.removeProperty('overflow');
            }
            else {
                body.style.removeAttribute('overflow');
            }
        };

        this.notify = function (config) {
            t.type = config.type;
            t.message = config.message;
            t.always = config.always;
            t.timeout = config.timeout || t.timeout;

            t.insertEl();
        };

        Vue.prototype.$lightNotify = this.notify;
    }
};
