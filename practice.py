import pdb
from rtlsdr import RtlSdr
from pylab import *
import numpy as np

sdr = RtlSdr()

# F_station = int(88.7e6)   # Rutgers Radio  
F_station = int(144.4e6)   # Rutgers Radio  
F_offset = 250000         # Offset to capture at  
# We capture at an offset to avoid DC spike
Fc = F_station - F_offset # Capture center frequency  
Fs = int(1140000)         # Sample rate  
N = int(8192000)            # Samples to capture  

# configure device
sdr.sample_rate = Fs      # Hz  
sdr.center_freq = Fc      # Hz  
sdr.gain = 'auto'

# Read samples
samples = sdr.read_samples(N)

print (samples)
x1 = np.array(samples).astype("complex64")
print (x1)
pdb.set_trace()
# Clean up the SDR device

psd(samples, NFFT=1024, Fs=sdr.sample_rate/1e6, Fc=sdr.center_freq/1e6)
xlabel('Frequency (MHz)')
ylabel('Relative power (dB)')

show()
sdr.close()
del(sdr)

