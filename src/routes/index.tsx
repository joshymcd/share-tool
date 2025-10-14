import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router' 
import { Textarea } from "@/components/ui/textarea" 
import { useState } from 'react'  
import { createShare } from '@/serverFunctions/share'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {   
  const [text, setText] = useState<string>("") 
  const navigate = useNavigate()
  const createShareFn = useServerFn(createShare)
  const { mutate: createShareMut } = useMutation({
    mutationFn: createShareFn,
    onSuccess: (data) => {
      console.log(data);
      navigate({ to: `/${data}` })
    },
    onError: (error) => {
      console.log(error);
    }
  })

  return <div className="container mx-auto flex flex-col gap-4 h-full  py-12">
    <h1 className="text-2xl font-bold text-center">Share Tool</h1>
    <Textarea  className="flex-1 w-full" rows={10} placeholder="Paste data here..." value={text}  onChange={(e) => setText(e.currentTarget.value)} />
    <Button onClick={() => createShareMut({ data: { text: text } })}>Format</Button>  
  </div>
}


const DUMMY_TEXT = `
okay, so milk… or am I on oat now? oat milk (barista) sounds right, maybe two, because coffee keeps disappearing.

bread situation: not the fancy sourdough, the cheap one that actually toasts right, and maybe those everything bagels because breakfasts keep vanishing.

eggs, large, and for the love of freshness check the dates this time.

bananas but not green and not mushy—medium sweet spot.

coffee beans—the blue bag with the bird? grind at home, don’t let them do it.

cereal with clusters, not the dusty flakes that sink.

yogurt: plain full-fat for bowls, plus a couple of tiny fruity ones for “a treat” that’s not actually a treat.

protein… chicken thighs (bone-in?) unless tofu’s on sale—decide in aisle.

pasta, the rigatoni that holds sauce, and that pesto with the green cap.

veg: cherry tomatoes, one red onion (only one), cucumber, and skip lettuce, go arugula because bite.

cheese plan: cheddar block (orange but not neon) and a parmesan wedge for shaving and pretending to be fancy.

tortillas, small flour, and please check they’re not already growing a science project.

peanut butter with no sugar, and strawberry jam (seeds are fine).

rice (jasmine), black beans x2, chickpeas x1 so there’s options.

olive oil is basically vapor—mid-size bottle, not the comically huge one.

garlic (don’t forget again) and a thumb of ginger.

spicy situation: is good sriracha back? if not, just grab gochujang and be done.

freezer therapy: peas, berries, and those dumplings in the green bag that cook perfectly when you’re over it.

snacks: kettle chips, sea salt only, because sweet chili is a trap and will vanish in one sitting.

cookies… the rectangle tin is calling—nostalgia says yes, wallet says maybe small tin only.

dark chocolate 70% for the emergency drawer that isn’t really an emergency.

house stuff: TP (12 if it fits), toothpaste (the minty burny one), lemon dish soap, non-scratch sponges.

foil—regular width, not the runway again.

batteries AA for… something? whatever, just get a pack.

cat situation: clumping unscented litter, salmon treats, and check the photo for how low the food is.

maybe a tiny bunch of flowers if it’s under 5€ and looks alive.

remember bags. seriously, remember the bags.

budget 60–70€. if it creeps over, cookies go first, then chips. not cheese. never cheese.
`