import numpy as np
from torch.utils import data


def StartSampling(n):
    i = n - 1
    order = np.random.permutation(n)
    while True:
        yield order[i]
        i += 1
        if i >= n:
            np.random.seed()
            order = np.random.permutation(n)
            i = 0


class Sampler(data.sampler.Sampler):
    def __init__(self, data_source):
        self.num_samples = len(data_source)

    def __iter__(self):
        return iter(StartSampling(self.num_samples))

    def __len__(self):
        return 2 ** 31
