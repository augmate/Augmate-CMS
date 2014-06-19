Ember4.QRCodePreviewView = Ember.View.extend({
    didInsertElement: function() {

        var qrcode_id = this.get('controller').get('model').get('qrcode');
        console.log("QRCodePreviewView::didInsertElement(); qrcode id: " + qrcode_id);
        
        if(!qrcode_id)
            return;
        
        var qrcode = new QRCode(document.getElementById('qrcode-render-target'), {
            text: 'qrcode_id',
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    },
    
    redrawQRCode: function() {

        var qrcode_id = this.get('controller').get('qrcode');
        
        console.log("QRCodePreviewView::redrawQRCode(); qrcode id: " + qrcode_id);
        
        $rt = $('#qrcode-render-target');
        $rt.empty();
        
        var qrcode = new QRCode($rt[0], {
            text: qrcode_id,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    },
    
    qrcodeDataChanged: function() {
        console.log("QRCodePreviewView::qrcodeDataChanged(); detected model data change..");
        this.redrawQRCode();
        
    }.observes('controller.qrcode')
});
