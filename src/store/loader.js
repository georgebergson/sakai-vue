import ProgressSpinner from 'primevue/progressspinner';
import { createApp, h, reactive } from 'vue';

// Gera um ID único (para identificar cada operação)
function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

const LoaderPlugin = {
    install(app) {
        const state = reactive({
            loadingList: [] // { id, message }
        });

        const show = (message = 'Carregando...') => {
            const id = generateId();
            state.loadingList.push({ id, message });
            return id; // retornamos o id para poder desligar depois
        };

        const hide = (id) => {
            const index = state.loadingList.findIndex((item) => item.id === id);
            if (index !== -1) state.loadingList.splice(index, 1);
        };

        const LoaderComponent = {
            setup() {
                return () =>
                    state.loadingList.length
                        ? h(
                              'div',
                              {
                                  style: {
                                      position: 'fixed',
                                      top: '0',
                                      left: '0',
                                      width: '100vw',
                                      height: '100vh',
                                      backgroundColor: 'rgba(0,0,0,0.6)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      zIndex: '9999',
                                      color: 'white',
                                      backdropFilter: 'blur(2px)'
                                  }
                              },
                              [
                                  h(ProgressSpinner),
                                  h(
                                      'div',
                                      {
                                          style: {
                                              marginTop: '1.5rem',
                                              textAlign: 'left'
                                          }
                                      },
                                      state.loadingList.map((item) =>
                                          h(
                                              'p',
                                              {
                                                  key: item.id,
                                                  style: { margin: '0.3rem 0', fontSize: '1.2rem' }
                                              },
                                              item.message
                                          )
                                      )
                                  )
                              ]
                          )
                        : null;
            }
        };

        // monta o loader invisível
        const loaderApp = createApp(LoaderComponent);
        loaderApp.mount(document.createElement('div'));
        document.body.appendChild(loaderApp._container);

        // registra globalmente
        app.config.globalProperties.$loader = { show, hide };
    }
};

export default LoaderPlugin;
