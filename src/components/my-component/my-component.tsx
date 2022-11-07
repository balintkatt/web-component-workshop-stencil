import  { Component, Prop, State, EventEmitter, Event, h } from  '@stencil/core';

@Component({
   tag: 'my-component',
   styleUrl: 'my-component.css',
   shadow: true
})
export  class  MyComponent  {
  selectedValue: any;
  @Prop() maxValue: number = 5;
  @Prop({ mutable: true }) value: number = 0;

  @Prop({ mutable: true }) emptyStarIcon: string = "&#x2606;";
  @Prop({ mutable: true }) fullStarIcon: string = "&#x2605;";
  @Prop({ mutable: true }) numberOfComments: number = 0;
  @Prop({ mutable: true }) titleOfComment: string = "reviews";
  @Prop() productName: string = "";

  @State() starList: Array<object> = [];

  @Event() ratingUpdated: EventEmitter;

  componentWillLoad() {
    this.createStarList(this.value);
    this.displayNumberOfCommentsAndTitle(this.numberOfComments, this.titleOfComment);
  }

  setValue(newValue) {
    this.value = newValue;
    this.createStarList(this.value);
    this.ratingUpdated.emit({ value: this.value });
  }

  createStarList(numberOfStars: number) {
    // this.selectedValue = numberOfStars;
    let starList = [];

    for (let i = 1; i <= this.maxValue; i++) {
      if (i <= numberOfStars) {
        starList.push(<span class="rating" onMouseOver={() => this.createStarList(i)} onMouseOut={() => this.createStarList(this.value)} onClick={() => this.setValue(i)}>{this.fullStarIcon}</span>);
      } else {
        starList.push(<span class="rating" onMouseOver={() => this.createStarList(i)} onMouseOut={() => this.createStarList(this.value)} onClick={() => this.setValue(i)}>{this.emptyStarIcon}</span>);
      }
    }
    this.starList = starList;
  }

  displayNumberOfCommentsAndTitle(comments, titleOfComment) {
    if(!titleOfComment) {
      this.titleOfComment = "reviews";
    }
    if(!comments) {
      this.numberOfComments = 0;
    }
  }

   render() {
    return  [
      <span class="product-name">{this.productName}</span>,
      <div class="rating-container">
        <div class="rating-icon">
            {this.starList}
        </div>
        <span class="rating-comment">{this.numberOfComments} {this.titleOfComment}</span>

      </div>,
      <span class="rating-selection">Selected rating: {this.value }</span>
    ];
   }
}
