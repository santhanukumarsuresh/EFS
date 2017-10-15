import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';

 export const pageLoaderModule = LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',  
        fullScreenBackdrop: true,
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    })
