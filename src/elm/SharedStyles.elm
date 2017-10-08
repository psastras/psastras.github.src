module SharedStyles exposing (..)

import Html.CssHelpers exposing (withNamespace)


type CssClasses
    = Nav
    | NavAvatar
    | Container
    | Page
    | PageContainer
    | PageHeader
    | PageHeaderMini
    | PageContent
    | Centered
    | PageHeaderText
    | PageContentText
    | PageHeaderAvatar
    | PageHeaderRow


mainNamespace : Html.CssHelpers.Namespace String class id msg
mainNamespace =
    withNamespace "main"
