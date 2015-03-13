from PIL import Image
print 'var pics = ['
img = Image.open('1-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('2-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('4-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('8-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('16-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('32-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('64-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+','
img = Image.open('128-doge.png').convert('RGB')
print str(list(img.getdata())).replace('(','[').replace(')',']')+']'

