package com.jdp.system; // <--- Verifique se o nome do seu projeto é este

import android.os.Bundle;
import org.apache.cordova.*;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Habilita o uso de extras no início
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Configuração do motor para carregar o index.html
        loadUrl(launchUrl);
    }

    @Override
    protected void onResume() {
        super.onResume();
        
        // AJUSTE DE ENGENHARIA SÊNIOR:
        // Garante que a WebView permita o ronco do motor (autoplay) 
        // sem precisar que o usuário toque na tela para o DJBOB começar.
        if (appView != null) {
            WebView webView = (WebView) appView.getEngine().getView();
            WebSettings settings = webView.getSettings();
            
            settings.setMediaPlaybackRequiresUserGesture(false); // Libera áudio/vídeo automático
            settings.setDomStorageEnabled(true);                // Libera login e sessões
            settings.setAllowFileAccess(true);                  // Libera acesso aos arquivos de mídia
        }
    }
}
