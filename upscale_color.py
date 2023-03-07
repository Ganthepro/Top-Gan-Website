from upscale import upscale

fname = str(input())
up = upscale(5,fname,False,None,None,None)
up.anti_aliasing(True)
print(up.getVec(True))