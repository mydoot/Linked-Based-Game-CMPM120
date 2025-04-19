class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Wake up.");
        this.engine.HasKey = false; 
        this.engine.TwoOfYou = false;
        this.engine.HasKeycard = false;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        this.engine.currentlocation = this.engine.storyData.Locations[key];
        
        
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        if (this.engine.TwoOfYou && locationData.Body2) {
            this.engine.show(locationData.Body2);
        } else {
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        }
    if (this.engine.HasKeycard && locationData.Choices2){
        if(locationData.Choices2) { // TODO: check if the location has   any Choices
            for(let choice of locationData.Choices2) { // TODO: loop over the location's Choices
                //let previousLoc = locationData.Body
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
    else {
        if(locationData.Choices) { // TODO: check if the location has   any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                //let previousLoc = locationData.Body
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
}

    handleChoice(choice) {
        if(choice) {
        if (this.engine.HasKeycard && this.engine.currentlocation.Choices2) {
            if (!choice.Thought) {
                if (choice.Target == "Room 4"){
                    if(!this.engine.HasKey){
                        this.engine.show("You walk towards the door but it doesn't open. It seems to need some sort of key.");
                        for(let Choice of this.engine.currentlocation.Choices2) { // TODO: loop over the location's Choices
                            //let previousLoc = locationData.Body
                            this.engine.addChoice(Choice.Text, Choice); // TODO: use the Text of the choice
                            
                        }
                    }else{
                        this.engine.show("&gt; "+choice.Text);  
                    this.engine.gotoScene(Location, choice.Target);
                    }
                } else {
                    this.engine.show("&gt; "+choice.Text);  
                    this.engine.gotoScene(Location, choice.Target);
                }

                if (choice.KeyObjective){
                    this.engine.show("&gt; "+choice.KeyObjective+" has joined you &lt");  
                    this.engine.TwoOfYou = true;
                }

                    
            }
            else {
                if (this.engine.TwoOfYou && choice.Thought2) {
                    this.engine.show("\n\n"+choice.Thought2)
                }
                else {
                this.engine.show("\n\n"+choice.Thought)
                }
                    if (choice.Item == "Key"){
                    this.engine.show("&gt; Obtained '"+choice.Item+"' &lt");  
                    this.engine.HasKey = true;
                    }
                    else if (choice.Item == "Keycard"){
                        this.engine.show("&gt; Obtained '"+choice.Item+"' &lt"); 
                        this.engine.show("You think you should head back to the door where you wake up.");  
                        this.engine.HasKeycard = true;
                        }
            for(let Choice of this.engine.currentlocation.Choices2) { // TODO: loop over the location's Choices
                //let previousLoc = locationData.Body
                this.engine.addChoice(Choice.Text, Choice); // TODO: use the Text of the choice
                

            }
        }

        } else {
            if (!choice.Thought) {
                if (choice.Target == "Room 4"){
                    if(!this.engine.HasKey){
                        this.engine.show("You walk towards the door but it doesn't open. It seems to need some sort of key.");
                        for(let Choice of this.engine.currentlocation.Choices) { // TODO: loop over the location's Choices
                            //let previousLoc = locationData.Body
                            this.engine.addChoice(Choice.Text, Choice); // TODO: use the Text of the choice
                            
                        }
                    }else{
                        this.engine.show("&gt; "+choice.Text);  
                    this.engine.gotoScene(Location, choice.Target);
                    }
                } else {
                    this.engine.show("&gt; "+choice.Text);  
                    this.engine.gotoScene(Location, choice.Target);
                }

                if (choice.KeyObjective){
                    this.engine.show("&gt; "+choice.KeyObjective+" has joined you &lt");  
                    this.engine.TwoOfYou = true;
                }
                    
            }
            else {
                if (this.engine.TwoOfYou && choice.Thought2) {
                    this.engine.show("\n\n"+choice.Thought2)
                }
                else {
                this.engine.show("\n\n"+choice.Thought)
                }
                if (choice.Item == "Key"){
                    this.engine.show("&gt; Obtained '"+choice.Item+"' &lt");  
                    this.engine.HasKey = true;
                    }
                    else if (choice.Item == "Keycard"){
                        this.engine.show("&gt; Obtained '"+choice.Item+"' &lt"); 
                        this.engine.show("You think you should head back to the door where you wake up.");  
                        this.engine.HasKeycard = true;
                        }
            for(let Choice of this.engine.currentlocation.Choices) { // TODO: loop over the location's Choices
                //let previousLoc = locationData.Body
                this.engine.addChoice(Choice.Text, Choice); // TODO: use the Text of the choice
                

            }
        }
        }
            
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');