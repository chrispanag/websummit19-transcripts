# WebSummit 2019 Transcripts

At WebSummit 2019, 46 talks (mainly from the Central Stage) were automatically transcripted in real-time using the [Otter.ai](https://otter.ai/) platform. This repo, provides the transcripted text, as well as the code to re-download it and preprocess it. 

With this dataset, you can do statistic analysis on the text of the transcripts, or even train a neural network model to produce your very own WebSummit speech. 

## How to use it

Each speech, is an individual `.txt` file inside the `plain-texts` folder eg: (`224STLFR2BIGPLOD.txt`). All the speeches are titled using their id from the otter.ai platform. If you have a different naming scheme to propose, I'm all ears! :D

Apart from that, inside the `plain-texts` folder, there is a `data.json` file, that includes all the raw data from otter.ai. 

### How to generate the data again:

#### Prepare the code:

1. `npm install`
2. `npm run compile`

#### Run the scripts:

1. `npm run datagen` (This downloads the transcripts from otter.ai and produces the `data.json` file)
2. `npm run preprocess` (This reads the `data.json` file and creates the various `.txt` files.)


## Contributions

Please fork, copy, share and contribute! 
