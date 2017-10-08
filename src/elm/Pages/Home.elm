module Pages.Home exposing (home)

import SharedStyles exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Components.Logo exposing (..)
import MD5


{ id, class, classList } =
    mainNamespace


gravatarUrl : String
gravatarUrl =
    "https://www.gravatar.com/avatar/" ++ MD5.hex "psastras@gmail.com"


home : Html msg
home =
    div [ class [ Page ] ]
        [ div [ class [ PageHeader ] ]
            [ div [ class [ PageHeaderRow ], style [ ( "flex", "auto" ) ] ] [ logo ]
            , div [ class [ PageHeaderRow ] ]
                [ div [ class [ PageHeaderText ] ]
                    [ (h1 [] [ text ("@psastras") ])
                    , (h3 [] [ text ("Paul Sastrasinh") ])
                    , (h3 [] [ text ("Full Stack Software Engineer, NYC Area") ])
                    ]
                , img [ class [ PageHeaderAvatar ], src gravatarUrl ] []
                ]
            ]
        , div [ class [ PageContent ] ]
            [ div [ class [ PageContentText ] ]
                [ h1 [] [ text ("About Me") ]
                , p []
                    [ text ("I'm a full stack software engineer living in NYC. My interests involve anything tech related, as well as photography, art, and food.")
                    ]
                , p []
                    [ text ("You can view my full resume and contact me via ")
                    , a [ href "https://www.linkedin.com/in/paul-sastrasinh-82480153/" ] [ text ("LinkedIn") ]
                    , text (".")
                    ]
                , h2 [] [ text ("Work") ]
                , p []
                    [ text ("I currently work as a software engineer for ")
                    , a [ href "https://www.knewton.com/" ] [ text ("Knewton") ]
                    , text (".")
                    ]
                ]
            ]
        ]
