import binascii as binascii

filename = "test.mid"

with open(filename) as f:
    mid = f.read()
    f.close()
    print(mid)
    hexs = binascii.hexlify(mid)

def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

hexArray = list(chunkstring(hexs, 2))

for nexs in range(len(hexArray)):
    tup = (nexs,hexArray[nexs],mid[nexs])
    print(tup)