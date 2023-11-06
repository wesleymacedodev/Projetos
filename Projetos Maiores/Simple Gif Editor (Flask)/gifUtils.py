from PIL import Image, ImageSequence, ImageOps, ImageFilter

def blurGif(gifPath, outputPath, blurStrenght):
    image = Image.open(f"{gifPath}")
    images = []
    for frame in ImageSequence.Iterator(image):
      images.append(frame.convert("RGBA").filter(ImageFilter.GaussianBlur(blurStrenght)))
    images[0].save(f"{outputPath}", save_all=True, append_images=images)
    return True 

def filterGif(gifPath, outputPath, filterType):
    filter = ["grayscale", "invert"]
    if(filterType in filter):
        image = Image.open(f"{gifPath}")
        images = []
        for frame in ImageSequence.Iterator(image):
            match filterType:
                case "invert":
                    images.append(ImageOps.invert(frame.copy().convert("L")))
                case "grayscale":
                    images.append(ImageOps.grayscale(frame.copy()))
        images[0].save(f"{outputPath}", save_all=True, append_images=images)
        return True 
    return False

def cropGif(gifPath, outputPath, x0, y0, x1, y1):
    if(x0 < x1 and y0 < y1):
        image = Image.open(f"{gifPath}")
        images = []
        for frame in ImageSequence.Iterator(image):
            image.crop()
            images.append(frame.copy().crop((x0, y0, x1, y1 )))
        images[0].save(f"{outputPath}", save_all=True, append_images=images)
        return True
    return False


def reverseGif(gifPath, outputPath):
    image = Image.open(f"{gifPath}")
    images = []
    for frame in ImageSequence.Iterator(image):
        images.append(frame.copy())
    images.reverse()
    images[0].save(f"{outputPath}", save_all=True, append_images=images)

def resizeGif(gifPath, outputPath, percentage):
    if(percentage > 0 and percentage < 100):
        image = Image.open(f"{gifPath}")
        images = []
        resizeSizes = image.size 
        resizeSizes = int(resizeSizes[0]*(percentage/100)), int(resizeSizes[1]*(percentage/100))
        for frame in ImageSequence.Iterator(image):
            images.append(frame.copy().resize(resizeSizes)) 
        images[0].save(f"{outputPath}", save_all=True, append_images=images)
        return True
    return False

def rotateGif(gifPath, outputPath, degree):
    if(degree >= -180 and degree <= 180):
        image = Image.open(f"{gifPath}")
        images = []
        for frame in ImageSequence.Iterator(image):
            images.append(frame.copy().rotate(degree, expand=True))
        images[0].save(f"{outputPath}", save_all=True, append_images=images)
        return True 
    return False
