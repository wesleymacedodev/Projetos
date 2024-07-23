import qrcode, cv2, pyzbar.pyzbar

def createQrcode(text, path):
    qr = qrcode.QRCode()
    qr.add_data(text)
    qr.make(fit=True)
    image = qr.make_image(fill_color="black", back_color="white")
    image.save(path)

def readQrcode(path):
    image = cv2.imread(path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    decode = pyzbar.pyzbar.decode(image)
    if decode:
        return decode[0].data.decode("utf-8")
    else:
        return None
    