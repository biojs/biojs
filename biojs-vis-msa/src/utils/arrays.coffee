module.exports =
  class Arrays
    # returns a merged array with the config and default config
    @recursiveDictFiller: (dicDefault, dicFill) ->


      for key,value of dicDefault

        entryFill = dicFill[key]

        if typeof(value) is "object"
          # we have more than one config
          if entryFill?
            dicFill[key] = Arrays.recursiveDictFiller dicDefault[key],entryFill
          else
            # no value set
            dicFill[key] = value

        else
          # elementar: string, boolean, int - no value set
          dicFill[key] = value unless entryFill?

      return dicFill
